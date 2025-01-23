import React from 'react'
//import { createContext } from "react";

const CartContext = React.createContext({
    cartList: [],
    removeAllCartItems: () => { },
    addCartItem: () => { },
    removeCartItem: () => { },
    incrementCartItemQuantity: () => { },
    decrementCartItemQuantity: () => { },
})

export default CartContext