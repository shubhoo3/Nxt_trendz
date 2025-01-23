import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

import CartContext from "@context/CartContext";


const CartItem = props => (
    <CartContext.Consumer>
        {value => {
            const {
                removeCartItem,
                incrementCartItemQuantity,
                decrementCartItemQuantity,
            } = value
            const { cartItemDetails } = props
            const { id, title, brand, quantity, price, imageUrl } = cartItemDetails
            const onClickDecrement = () => {
                decrementCartItemQuantity(id)
            }
            const onClickIncrement = () => {
                incrementCartItemQuantity(id)
            }
            const onRemoveCartItem = () => {
                removeCartItem(id)
            }
            const totalPrice = price * quantity

            return (
                <li className="flex items-center bg-white p-4 mb-4 shadow-md sm:mb-8 sm:px-9 sm:py-6">
                    <img
                        className="w-24 h-24 rounded"
                        src={imageUrl}
                        alt={title}
                    />
                    <div className="ml-4 flex flex-col sm:flex-row sm:justify-between sm:flex-grow">
                        <div className="sm:w-[250px]">
                            <p className="text-[#171f46] font-roboto font-medium text-xs sm:text-base m-0">
                                {title}
                            </p>
                            <p className="text-[#64748b] font-roboto text-[10px] sm:text-sm">
                                by {brand}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="p-0"
                                onClick={onClickDecrement}
                            >
                                <BsDashSquare color="#52606D" size={12} />
                            </button>
                            <p className="text-[#52606d] font-roboto font-medium text-xs sm:text-lg mx-2 sm:mx-4">
                                {quantity}
                            </p>
                            <button
                                type="button"
                                className="p-0"
                                onClick={onClickIncrement}
                            >
                                <BsPlusSquare color="#52606D" size={12} />
                            </button>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                            <p className="text-[#0b69ff] font-roboto font-medium text-base sm:text-lg mr-4 min-w-[100px]">
                                Rs {totalPrice}/-
                            </p>
                            <button
                                className="hidden sm:block text-[#334155] font-roboto text-xs bg-transparent border-none cursor-pointer"
                                type="button"
                                onClick={onRemoveCartItem}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <button
                        className="ml-8 hidden sm:block bg-transparent border-none cursor-pointer"
                        type="button"
                        onClick={onRemoveCartItem}
                    >
                        <AiFillCloseCircle color="#616E7C" size={20} />
                    </button>
                </li>
            )
        }}
    </CartContext.Consumer>
)

export default CartItem
