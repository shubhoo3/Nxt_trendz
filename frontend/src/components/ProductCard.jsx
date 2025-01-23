import { Link } from 'react-router-dom'

const ProductCard = props => {
    const { productData } = props
    const { title, brand, imageUrl, rating, price, id } = productData

    return (
        <li className="list-none mb-12 w-[350px] flex-shrink flex-grow-0 mr-5 md:w-[300px]">
            <Link
                to={`/products/${id}`}
                className="flex flex-col no-underline"
            >
                <img
                    src={imageUrl}
                    alt="product"
                    className="w-full max-h-[350px] rounded-md"
                />
                <h1 className="text-[#171f46] font-roboto text-xl font-medium mt-5 mb-2">
                    {title}
                </h1>
                <p className="text-[#594d6d] font-roboto text-lg mb-1">by {brand}</p>
                <div className="flex justify-between items-end mt-1">
                    <p className="text-[#171f46] font-roboto text-lg font-bold m-0">
                        Rs {price}/-
                    </p>
                    <div className="flex items-center bg-blue-500 rounded-md py-1 px-4">
                        <p className="text-white font-roboto text-base font-medium mr-1 my-0">
                            {rating}
                        </p>
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                            alt="star"
                            className="h-5 w-5 mb-1"
                        />
                    </div>
                </div>
            </Link>
        </li>
    )
}
export default ProductCard
