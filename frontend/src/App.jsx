// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Vendors = lazy(() => import('./pages/Vendors'));
const Products = lazy(() => import('./pages/Products'));
const PurchaseOrders = lazy(() => import('./pages/PurchaseOrders'));
// const Settings = lazy(() => import('./pages/Settings'));

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <AppProvider>
      <Router>
        <div className={`flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 rounded-b-3xl">
              <div className="max-w-7xl mx-auto py-6 px-6 sm:px-8 lg:px-10 flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">ProssimaTech</h1>
                <button
                  onClick={toggleDarkMode}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg transform hover:scale-105"
                >
                  {darkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
              </div>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <div className="container mx-auto px-6 py-10">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/vendors" element={<Vendors />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/purchase-orders" element={<PurchaseOrders />} />
                    {/* <Route path="/settings" element={<Settings />} /> */}
                  </Routes>
                </Suspense>
              </div>
            </main>
          </div>
        </div>
        <Toaster 
          position="top-right" 
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white rounded-lg shadow-md',
            duration: 3000,
            style: {
              background: 'linear-gradient(to right, #8B5CF6, #EC4899)',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
            },
          }}
        />
      </Router>
    </AppProvider>
  );
}

export default App;