import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'

import CartContext from "@context/CartContext";


import Header from './Header'
import SimilarProductItem from './SimilarProductItem'

const ProductItemDetails = () => {
    const [productData, setProductData] = useState({})
    const [similarProductsData, setSimilarProductsData] = useState([])
    const [apiStatus, setApiStatus] = useState('INITIAL')
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()
    const { addCartItem } = useContext(CartContext)

    const getFormattedData = data => ({
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.total_reviews,
    })

    useEffect(() => {
        const getProductData = async () => {
            setApiStatus('IN_PROGRESS')
            const jwtToken = Cookies.get('jwt_token')
            const apiUrl = `https://apis.ccbp.in/products/${id}`
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            }
            const response = await fetch(apiUrl, options)
            if (response.ok) {
                const fetchedData = await response.json()
                const updatedData = getFormattedData(fetchedData)
                const updatedSimilarProductsData = fetchedData.similar_products.map(
                    eachSimilarProduct => getFormattedData(eachSimilarProduct),
                )
                setProductData(updatedData)
                setSimilarProductsData(updatedSimilarProductsData)
                setApiStatus('SUCCESS')
            } else {
                setApiStatus('FAILURE')
            }
        }

        getProductData()
    }, [id]) // Re-run when the `id` changes.

   const renderLoadingView = () => (
           <div className="flex justify-center items-center min-h-[60vh]">
               <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
           </div>
       )

    const renderFailureView = () => (
        <div className="flex flex-col justify-center items-center h-[80vh]">
            <img
                alt="error view"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                className="w-64 h-40 md:w-[540px] md:h-[290px]"
            />
            <h1 className="text-gray-800 text-2xl md:text-4xl font-medium mt-12">
                Product Not Found
            </h1>
            <Link to="/products">
                <button
                    type="button"
                    className="bg-blue-600 text-white font-medium rounded px-6 py-3 mt-6"
                >
                    Continue Shopping
                </button>
            </Link>
        </div>
    )

    const onDecrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1)
        }
    }

    const onIncrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    const renderProductDetailsView = () => {
        const {
            availability,
            brand,
            description,
            imageUrl,
            price,
            rating,
            title,
            totalReviews,
        } = productData

        const onClickAddToCart = () => {
            addCartItem({ ...productData, quantity })
        }

        return (
            <div className="w-full max-w-screen-lg mx-auto p-4 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={imageUrl}
                        alt="product"
                        className="w-full max-w-sm rounded-lg"
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-medium text-gray-800">{title}</h1>
                        <p className="text-xl font-bold text-gray-900 mt-4">
                            Rs {price}/-
                        </p>
                        <div className="flex items-center mt-4">
                            <div className="flex items-center bg-blue-600 text-white px-3 py-1 rounded">
                                <p className="text-sm">{rating}</p>
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                    alt="star"
                                    className="w-4 h-4 ml-2"
                                />
                            </div>
                            <p className="text-sm text-gray-600 ml-4">{totalReviews} Reviews</p>
                        </div>
                        <p className="text-gray-600 mt-4">{description}</p>
                        <div className="flex gap-2 mt-4">
                            <p className="text-gray-800 font-medium">Available:</p>
                            <p className="text-gray-600">{availability}</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <p className="text-gray-800 font-medium">Brand:</p>
                            <p className="text-gray-600">{brand}</p>
                        </div>
                        <hr className="border-t border-gray-300 my-6" />
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={onDecrementQuantity}
                                className="text-gray-600"
                            >
                                <BsDashSquare size={20} />
                            </button>
                            <p className="text-lg text-gray-800 font-medium">{quantity}</p>
                            <button
                                type="button"
                                onClick={onIncrementQuantity}
                                className="text-gray-600"
                            >
                                <BsPlusSquare size={20} />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={onClickAddToCart}
                            className="bg-blue-600 text-white font-medium rounded px-6 py-3 mt-6"
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
                <h1 className="text-xl font-medium text-gray-800 mt-8">
                    Similar Products
                </h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {similarProductsData.map(eachSimilarProduct => (
                        <SimilarProductItem
                            productDetails={eachSimilarProduct}
                            key={eachSimilarProduct.id}
                        />
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className="flex justify-center mt-8">
                {apiStatus === 'SUCCESS' && renderProductDetailsView()}
                {apiStatus === 'FAILURE' && renderFailureView()}
                {apiStatus === 'IN_PROGRESS' && renderLoadingView()}
            </div>
        </>
    )
}

export default ProductItemDetails
