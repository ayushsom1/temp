// src/pages/PurchaseOrders.jsx
import React, { useState, useEffect, Fragment } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchPurchaseOrders, createPurchaseOrder, fetchVendors, fetchProducts } from '../services/api';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, EnvelopeIcon, PrinterIcon, CheckCircleIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const PurchaseOrderRow = ({ reference, date, vendor, total, status }) => (
  <tr className="bg-white dark:bg-gray-800">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{reference}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{date}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{vendor}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">₹{total}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

const PurchaseOrderForm = ({ onSubmit, onCancel }) => {
  const { state } = useAppContext();
  const [formData, setFormData] = useState({
    vendor: '',
    purchaseOrderNumber: '',
    date: '',
    deliveryDate: '',
    billingAddress: '',
    shippingAddress: '',
    products: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: '',
    termsAndConditions: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    updatedProducts[index].total = updatedProducts[index].price * updatedProducts[index].quantity;
    setFormData({ ...formData, products: updatedProducts });
    calculateTotal(updatedProducts);
  };

  const addProduct = (product) => {
    const newProduct = { ...product, quantity: 1, total: product.price };
    const updatedProducts = [...formData.products, newProduct];
    setFormData({ ...formData, products: updatedProducts });
    calculateTotal(updatedProducts);
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
    calculateTotal(updatedProducts);
  };

  const calculateTotal = (products) => {
    const subtotal = products.reduce((sum, product) => sum + product.total, 0);
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;
    setFormData(prevState => ({
      ...prevState,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="vendor">
            Vendor *
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="vendor"
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a vendor</option>
            {state.vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="purchaseOrderNumber">
            Purchase Order Number *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="purchaseOrderNumber"
            type="text"
            name="purchaseOrderNumber"
            value={formData.purchaseOrderNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="date">
            Date *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="deliveryDate">
            Delivery Date *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="deliveryDate"
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="billingAddress">
            Billing Address *
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleInputChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="shippingAddress">
            Shipping Address *
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            rows="3"
            required
          ></textarea>
        </div>
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Products *
        </label>
        {formData.products.map((product, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
              className="w-20 shadow appearance-none border rounded py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
              min="1"
              required
            />
            <span className="text-gray-700 dark:text-gray-300">Price: ₹{product.price}</span>
            <span className="text-gray-700 dark:text-gray-300">Total: ₹{product.total}</span>
            <button
              type="button"
              onClick={() => removeProduct(index)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
        <select
          onChange={(e) => addProduct(JSON.parse(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
        >
          <option value="">Add a product</option>
          {state.products.map(product => (
            <option key={product.id} value={JSON.stringify(product)}>{product.name} - ₹{product.price}</option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-gray-700 dark:text-gray-300">Subtotal: ₹{formData.subtotal}</p>
        <p className="text-gray-700 dark:text-gray-300">Tax (10%): ₹{formData.tax}</p>
        <p className="text-gray-700 dark:text-gray-300 font-bold">Total: ₹{formData.total}</p>
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="termsAndConditions">
          Terms and Conditions
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="termsAndConditions"
          name="termsAndConditions"
          value={formData.termsAndConditions}
          onChange={handleInputChange}
          rows="4"
        ></textarea>
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="notes">
          Notes
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows="4"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
        >
          Create Purchase Order
        </button>
      </div>
    </form>
  );
};

const PurchaseOrders = () => {
  const { state, dispatch } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [purchaseOrders, vendors, products] = await Promise.all([
          fetchPurchaseOrders(),
          fetchVendors(),
          fetchProducts()
        ]);
        dispatch({ type: 'SET_PURCHASE_ORDERS', payload: purchaseOrders });
        dispatch({ type: 'SET_VENDORS', payload: vendors });
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  const handleCreatePurchaseOrder = async (purchaseOrderData) => {
    try {
      const newPurchaseOrder = await createPurchaseOrder(purchaseOrderData);
      dispatch({ type: 'ADD_PURCHASE_ORDER', payload: newPurchaseOrder });
      setIsModalOpen(false);
      toast.success('Purchase order created successfully');
    } catch (error) {
      toast.error('Failed to create purchase order');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Purchase Orders</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Purchase Order
        </button>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reference</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vendor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
              {state.purchaseOrders.map(order => (
                <PurchaseOrderRow
                  key={order.id}
                  reference={order.reference}
                  date={order.date}
                  vendor={order.vendor}
                  total={order.total}
                  status={order.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Create New Purchase Order
                  </Dialog.Title>
                  <div className="mt-2">
                    <PurchaseOrderForm
                      onSubmit={handleCreatePurchaseOrder}
                      onCancel={() => setIsModalOpen(false)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> 
    </div>
  );
};

export default PurchaseOrders;