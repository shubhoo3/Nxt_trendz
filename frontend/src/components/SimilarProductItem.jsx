const SimilarProductItem = props => {
    const { productDetails } = props
    const { title, brand, imageUrl, rating, price } = productDetails

    return (
        <li className="flex flex-col list-none md:w-[200px] md:mr-16">
            <img
                src={imageUrl}
                className="w-[200px] rounded-lg"
                alt={`similar product ${title}`}
            />
            <p className="text-gray-900 font-roboto text-base font-medium mb-1.5">
                {title}
            </p>
            <p className="text-gray-600 font-roboto text-base mt-1.5">by {brand}</p>
            <div className="flex justify-between items-center w-[200px]">
                <p className="text-gray-900 font-roboto text-lg font-bold">
                    Rs {price}/-
                </p>
                <div className="flex items-center bg-blue-500 rounded-md px-2 py-1">
                    <p className="text-white font-roboto text-sm font-medium mr-1">
                        {rating}
                    </p>
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="h-[14px] w-[14px]"
                    />
                </div>
            </div>
        </li>
    )
}

export default SimilarProductItem
