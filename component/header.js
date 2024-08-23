import React, { useReducer } from 'react';
import './header.css'; // Import custom CSS for styling

// Initial cart state
const initialState = {
  cart: []
};

// Reducer function to manage cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'INCREASE_QTY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        )
      };

    case 'DECREASE_QTY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 } : item
        )
      };

    default:
      return state;
  }
};

// Sample product data with images
const products = [
  { id: 1, name: 'iPhone 13', price: 59999, image: 'https://via.placeholder.com/150?text=iPhone+13' },
  { id: 2, name: 'Samsung Galaxy S21', price: 41799, image: 'https://via.placeholder.com/150?text=Galaxy+S21' },
  { id: 3, name: 'MacBook Pro', price: 341299, image: 'https://via.placeholder.com/150?text=MacBook+Pro' },
  { id: 4, name: 'Sony Headphones', price: 32299, image: 'https://via.placeholder.com/150?text=Sony+Headphones' },
  { id: 5, name: 'iPhone 12 pro', price: 17999, image: 'https://via.placeholder.com/150?text=iPhone+13' },
  { id: 6, name: 'Samsung Galaxy S23 pro', price: 52799, image: 'https://via.placeholder.com/150?text=Galaxy+S21' },
  { id: 7, name: 'OPPO 13 Pro ', price: 21299, image: 'https://via.placeholder.com/150?text=MacBook+Pro' },
  { id: 8, name: 'Sony TV', price: 17299, image: 'https://via.placeholder.com/150?text=Sony+Headphones' },
  { id: 9, name: 'iPhone 13', price: 13999, image: 'https://via.placeholder.com/150?text=iPhone+13' },
  { id: 10, name: 'Samsung Galaxy S21', price: 14799, image: 'https://via.placeholder.com/150?text=Galaxy+S21' },
  { id: 11, name: 'Iphone 13 pro', price: 51299, image: 'https://via.placeholder.com/150?text=MacBook+Pro' },
  { id: 12, name: 'Sony Headphones', price: 1299, image: 'https://via.placeholder.com/150?text=Sony+Headphones' },
];


const ShoppingCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to handle adding an item to the cart
  const addItemToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // Function to increase quantity of an item
  const increaseQty = (id) => {
    dispatch({ type: 'INCREASE_QTY', payload: id });
  };

  // Function to decrease quantity of an item
  const decreaseQty = (id) => {
    dispatch({ type: 'DECREASE_QTY', payload: id });
  };

  const { cart } = state;

  return (
    <div className="container">
      <div className='header'>
        <h1> ONLINE SHOPPING</h1>
      </div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addItemToCart(product)} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-list">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              {/* <img src={item.image} alt={item.name} className="cart-item-image" /> */}
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price} x {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => increaseQty(item.id)} className="quantity-button">+</button>
                <button onClick={() => decreaseQty(item.id)} className="quantity-button">-</button>
                <button onClick={() => removeItemFromCart(item.id)} className="remove-button">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>
            Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
