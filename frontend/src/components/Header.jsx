import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from "@context/CartContext";

const Header = () => {
    const navigate = useNavigate() // Use useNavigate hook

    const onClickLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login') // Replace history.replace with navigate
    }

    const renderCartItemsCount = () => (
        <CartContext.Consumer>
            {value => {
                const { cartList } = value
                const cartItemsCount = cartList.length

                return (
                    <>
                        {cartItemsCount > 0 && (
                            <span className="bg-blue-200 text-blue-600 font-medium text-xs rounded-full px-2 py-1 ml-2">
                                {cartList.length}
                            </span>
                        )}
                    </>
                )
            }}
        </CartContext.Consumer>
    )

    return (
        <nav className="flex justify-center border-b border-gray-200">
            <div className="flex items-center justify-between w-11/12 max-w-5xl py-6">
                {/* Mobile Navbar */}
                <div className="flex justify-between w-full md:hidden">
                    <Link to="/">
                        <img
                            className="w-28"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                            alt="website logo"
                        />
                    </Link>

                    <button
                        type="button"
                        className="p-0 bg-transparent border-none outline-none"
                        onClick={onClickLogout}
                    >
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                            alt="nav logout"
                            className="w-6"
                        />
                    </button>
                </div>

                {/* Desktop Navbar */}
                <div className="hidden md:flex items-center justify-between w-full">
                    <Link to="/">
                        <img
                            className="w-40"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                            alt="website logo"
                        />
                    </Link>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link to="/" className="text-gray-700 text-base font-medium">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="text-gray-700 text-base font-medium">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="text-gray-700 text-base font-medium flex items-center">
                                Cart
                                {renderCartItemsCount()}
                            </Link>
                        </li>
                    </ul>
                    <button
                        type="button"
                        className="bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-md"
                        onClick={onClickLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="w-full md:hidden bg-blue-100">
                <ul className="flex justify-around items-center h-16">
                    <li>
                        <Link to="/" className="text-gray-700">
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                                alt="nav home"
                                className="w-6"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="text-gray-700">
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                                alt="nav products"
                                className="w-6"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-gray-700 flex items-center">
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                                alt="nav cart"
                                className="w-6"
                            />
                            {renderCartItemsCount()}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
