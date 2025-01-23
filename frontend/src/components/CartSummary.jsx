import CartContext from "@context/CartContext";


const CartSummary = () => (
    <CartContext.Consumer>
        {value => {
            const { cartList } = value
            let total = 0
            cartList.forEach(eachCartItem => {
                total += eachCartItem.price * eachCartItem.quantity
            })

            return (
                <>
                    <div className="flex flex-col self-end">
                        <h1 className="text-[#171f46] font-roboto text-base sm:text-2xl mb-0.5">
                            <span className="text-[#616e7c] font-medium text-base sm:text-xl">
                                Order Total:
                            </span>{' '}
                            Rs {total}/-
                        </h1>
                        <p className="text-[#616e7c] font-roboto text-xs sm:text-base mt-0.5">
                            {cartList.length} Items in cart
                        </p>
                        <button
                            type="button"
                            className="bg-[#0b69ff] text-white font-roboto text-xs rounded px-4 py-3 mt-2 hidden sm:block"
                        >
                            Checkout
                        </button>
                    </div>
                    <button
                        type="button"
                        className="bg-[#0b69ff] text-white font-roboto text-xs rounded px-4 py-3 mt-2 block sm:hidden"
                    >
                        Checkout
                    </button>
                </>
            )
        }}
    </CartContext.Consumer>
)

export default CartSummary
