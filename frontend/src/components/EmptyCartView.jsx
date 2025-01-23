import { Link } from 'react-router-dom'

const EmptyCartView = () => (
    <div className="flex flex-col items-center self-center">
        <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            className="w-44 h-48 sm:w-90 sm:h-96"
            alt="cart empty"
        />
        <h1 className="text-[#1e293b] font-roboto font-medium text-xl sm:text-3xl">
            Your Cart Is Empty
        </h1>
        <Link to="/products">
            <button
                type="button"
                className="bg-[#0b69ff] text-white font-roboto text-xs rounded-lg px-4 py-2 mt-4"
            >
                Shop Now
            </button>
        </Link>
    </div>
)

export default EmptyCartView
