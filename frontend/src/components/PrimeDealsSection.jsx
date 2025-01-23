import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner';

import ProductCard from './ProductCard'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const PrimeDealsSection = () => {
    const [primeDeals, setPrimeDeals] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

    useEffect(() => {
        getPrimeDeals()
    }, [])

    const getPrimeDeals = async () => {
        setApiStatus(apiStatusConstants.inProgress)

        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = 'https://apis.ccbp.in/prime-deals'
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }

        const response = await fetch(apiUrl, options)
        if (response.ok) {
            const fetchedData = await response.json()
            const updatedData = fetchedData.prime_deals.map(product => ({
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
            }))
            setPrimeDeals(updatedData)
            setApiStatus(apiStatusConstants.success)
        } else if (response.status === 401) {
            setApiStatus(apiStatusConstants.failure)
        }
    }

    const renderPrimeDealsListView = () => (
        <div>
            <h1 className="text-2xl text-gray-600 font-medium mt-12">
                Exclusive Prime Deals
            </h1>
            <ul className="flex flex-wrap pl-0">
                {primeDeals.map(product => (
                    <ProductCard productData={product} key={product.id} />
                ))}
            </ul>
        </div>
    )

    const renderPrimeDealsFailureView = () => (
        <img
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
            alt="register prime"
            className="mt-8"
        />
    )

    const renderLoadingView = () => (
        <div className="flex justify-center items-center min-h-[60vh]">
            <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
    )

    const renderView = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderPrimeDealsListView()
            case apiStatusConstants.failure:
                return renderPrimeDealsFailureView()
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            default:
                return null
        }
    }

    return <>{renderView()}</>
}

export default PrimeDealsSection
