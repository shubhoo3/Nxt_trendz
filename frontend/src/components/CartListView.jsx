import CartItem from './CartItem'
import CartContext from "@context/CartContext";


const CartListView = () => (
    <CartContext.Consumer>
        {value => {
            const { cartList } = value

            return (
                <ul className="list-none">
                    {cartList.map(eachCartItem => (
                        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
                    ))}
                </ul>
            )
        }}
    </CartContext.Consumer>
)

export default CartListView
