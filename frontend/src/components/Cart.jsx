import CartContext from "@context/CartContext";


import Header from './Header'
import EmptyCartView from './EmptyCartView'
import CartListView from './CartListView'
import CartSummary from './CartSummary'

const Cart = () => (
    <CartContext.Consumer>
        {value => {
            const { cartList, removeAllCartItems } = value
            const showEmptyView = cartList.length === 0
            const onClickRemoveAllBtn = () => {
                removeAllCartItems()
            }

            return (
                <>
                    <Header />
                    <div className="flex justify-center min-h-[75vh] sm:min-h-[90vh]">
                        {showEmptyView ? (
                            <EmptyCartView />
                        ) : (
                            <div className="flex flex-col w-[90%] max-w-[1110px] sm:w-[80%]">
                                <h1 className="text-[#3e4c59] font-roboto font-bold text-2xl sm:text-4xl">
                                    My Cart
                                </h1>
                                <button
                                    type="button"
                                    className="self-end text-[#0b69ff] bg-transparent font-roboto font-medium text-lg sm:text-base cursor-pointer border-none outline-none"
                                    onClick={onClickRemoveAllBtn}
                                >
                                    Remove All
                                </button>
                                <CartListView />
                                <CartSummary />
                            </div>
                        )}
                    </div>
                </>
            )
        }}
    </CartContext.Consumer>
)

export default Cart
