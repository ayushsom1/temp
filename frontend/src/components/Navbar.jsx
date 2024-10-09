// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">PurchaseFlow</Link>
          <div className="flex space-x-4">
            <Link to="/purchase-orders" className="hover:text-purple-200">Purchase Orders</Link>
            <Link to="/products" className="hover:text-purple-200">Products</Link>
            <Link to="/vendors" className="hover:text-purple-200">Vendors</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;