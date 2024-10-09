// src/context/AppContext.jsx
import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  purchaseOrders: [],
  products: [],
  vendors: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PURCHASE_ORDERS':
      return { ...state, purchaseOrders: action.payload };
    case 'ADD_PURCHASE_ORDER':
      return { ...state, purchaseOrders: [...state.purchaseOrders, action.payload] };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    case 'SET_VENDORS':
      return { ...state, vendors: action.payload };
    case 'ADD_VENDOR':
      return { ...state, vendors: [...state.vendors, action.payload] };
    case 'UPDATE_VENDOR':
      return { ...state, vendors: state.vendors.map(v => v.id === action.payload.id ? action.payload : v) };
    case 'DELETE_VENDOR':
      return { ...state, vendors: state.vendors.filter(v => v.id !== action.payload) };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);