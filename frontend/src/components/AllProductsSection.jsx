import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';

import FiltersGroup from './FiltersGroup';
import ProductCard from './ProductCard';
import ProductsHeader from './ProductsHeader';

const categoryOptions = [
    { name: 'Clothing', categoryId: '1' },
    { name: 'Electronics', categoryId: '2' },
    { name: 'Appliances', categoryId: '3' },
    { name: 'Grocery', categoryId: '4' },
    { name: 'Toys', categoryId: '5' },
];

const sortbyOptions = [
    { optionId: 'PRICE_HIGH', displayText: 'Price (High-Low)' },
    { optionId: 'PRICE_LOW', displayText: 'Price (Low-High)' },
];

const ratingsList = [
    { ratingId: '4', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png' },
    { ratingId: '3', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png' },
    { ratingId: '2', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png' },
    { ratingId: '1', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png' },
];

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
};

const AllProductsSection = () => {
    const [productsList, setProductsList] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);
    const [activeCategoryId, setActiveCategoryId] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [activeRatingId, setActiveRatingId] = useState('');

    useEffect(() => {
        getProducts();
    }, [activeOptionId, activeCategoryId, searchInput, activeRatingId]);

    const getProducts = async () => {
        setApiStatus(apiStatusConstants.inProgress);
        const jwtToken = Cookies.get('jwt_token');
        const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;
        const options = {
            headers: { Authorization: `Bearer ${jwtToken}` },
            method: 'GET',
        };
        const response = await fetch(apiUrl, options);
        if (response.ok) {
            const fetchedData = await response.json();
            const updatedData = fetchedData.products.map(product => ({
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
            }));
            setProductsList(updatedData);
            setApiStatus(apiStatusConstants.success);
        } else {
            setApiStatus(apiStatusConstants.failure);
        }
    };

    const renderLoadingView = () => (
        <div className="flex justify-center items-center h-screen">
            <ThreeDots color="#0b69ff" height={50} width={50} />
        </div>
    );

    const renderFailureView = () => (
        <div className="flex flex-col justify-center items-center mt-12 sm:w-3/5">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
                alt="all-products-error"
                className="w-60 h-48 sm:w-96 sm:h-80"
            />
            <h1 className="text-gray-900 font-medium text-xl sm:text-2xl">Oops! Something Went Wrong</h1>
            <p className="text-gray-600 text-sm sm:text-lg text-center mt-2">
                We are having some trouble processing your request. Please try again.
            </p>
        </div>
    );

    const renderProductsListView = () => {
        const shouldShowProductsList = productsList.length > 0;

        return shouldShowProductsList ? (
            <div className="sm:ml-8 sm:w-3/5">
                <ProductsHeader
                    activeOptionId={activeOptionId}
                    sortbyOptions={sortbyOptions}
                    changeSortby={setActiveOptionId}
                />
                <ul className="flex flex-wrap p-0">
                    {productsList.map(product => (
                        <ProductCard productData={product} key={product.id} />
                    ))}
                </ul>
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center mt-12 sm:w-3/5">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                    className="w-60 h-44 sm:w-[459px] sm:h-[315px]"
                    alt="no products"
                />
                <h1 className="text-gray-900 font-medium text-xl sm:text-2xl mt-4">No Products Found</h1>
                <p className="text-gray-600 text-sm sm:text-lg text-center mt-3">
                    We could not find any products. Try other filters.
                </p>
            </div>
        );
    };

    const renderAllProducts = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderProductsListView();
            case apiStatusConstants.failure:
                return renderFailureView();
            case apiStatusConstants.inProgress:
                return renderLoadingView();
            default:
                return null;
        }
    };

    const clearFilters = () => {
        setSearchInput('');
        setActiveCategoryId('');
        setActiveRatingId('');
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between pb-24">
            <FiltersGroup
                searchInput={searchInput}
                categoryOptions={categoryOptions}
                ratingsList={ratingsList}
                changeSearchInput={setSearchInput}
                enterSearchInput={getProducts}
                activeCategoryId={activeCategoryId}
                activeRatingId={activeRatingId}
                changeCategory={setActiveCategoryId}
                changeRating={setActiveRatingId}
                clearFilters={clearFilters}
            />
            {renderAllProducts()}
        </div>
    );
};

export default AllProductsSection;
