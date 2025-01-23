import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CartContext from '@context/CartContext';

import './App.css';

class App extends Component {
  state = {
    cartList: [],
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  incrementCartItemQuantity = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((eachCartItem) => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1;
          return { ...eachCartItem, quantity: updatedQuantity };
        }
        return eachCartItem;
      }),
    }));
  };

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const productObject = cartList.find((eachCartItem) => eachCartItem.id === id);
    if (productObject.quantity > 1) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        }),
      }));
    } else {
      this.removeCartItem(id);
    }
  };

  removeCartItem = (id) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.filter((eachCartItem) => eachCartItem.id !== id);

    this.setState({ cartList: updatedCartList });
  };

  addCartItem = (product) => {
    const { cartList } = this.state;
    const productObject = cartList.find((eachCartItem) => eachCartItem.id === product.id);

    if (productObject) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity;

            return { ...eachCartItem, quantity: updatedQuantity };
          }

          return eachCartItem;
        }),
      }));
    } else {
      const updatedCartList = [...cartList, product];

      this.setState({ cartList: updatedCartList });
    }
  };

  render() {
    const { cartList } = this.state;

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/products"
              element={<ProtectedRoute element={<Products />} />}
            />
            <Route
              path="/products/:id"
              element={<ProtectedRoute element={<ProductItemDetails />} />}
            />
            <Route
              path="/cart"
              element={<ProtectedRoute element={<Cart />} />}
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    );
  }
}

export default App;
