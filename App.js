import React, { useReducer } from 'react';
import './App.css';

// Define the initial state of the cart
const initialState = {
  cart: [],
};

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
        };
      }
    
    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    
    default:
      return state;
  }
};

// The main component
const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Sample item list to add to the cart
  const items = [
    { id: 1, name: 'Apple', price: 0.5 },
    { id: 2, name: 'Banana', price: 0.3 },
    { id: 3, name: 'Carrot', price: 0.2 },
  ];

  // Add item to the cart
  const addItemToCart = (item, quantity) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  // Update item quantity in the cart
  const updateItemQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: { id, quantity },
    });
  };

  // Remove item from the cart
  const removeItemFromCart = id => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id },
    });
  };

  return (
    <div className="App">
      <h2>Grocery Store</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => addItemToCart(item, 1)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      
      <h2>Shopping Cart</h2>
      <ul>
        {state.cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      
      <h3>Total: ${state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
    </div>
  );
};

export default App;
