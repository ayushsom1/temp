import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { createPurchaseOrder, fetchVendors, fetchProducts } from '../services/api';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, TrashIcon, EnvelopeIcon, PrinterIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const PurchaseOrderForm = ({ onSubmit, onCancel }) => {
  const { state } = useAppContext();
  const [formData, setFormData] = useState({
    vendor: '',
    gstTreatment: 'Consumer',
    vendorReference: '',
    orderDeadline: '',
    expectedArrival: '',
    products: [],
    termsAndConditions: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = (product) => {
    setFormData({
      ...formData,
      products: [...formData.products, { ...product, quantity: 1 }],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="vendor">
          Vendor
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
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="gstTreatment">
          GST Treatment
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="gstTreatment"
          name="gstTreatment"
          value={formData.gstTreatment}
          onChange={handleInputChange}
        >
          <option value="Consumer">Consumer</option>
          <option value="Registered Business">Registered Business</option>
          <option value="Overseas">Overseas</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="vendorReference">
          Vendor Reference
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="vendorReference"
          type="text"
          name="vendorReference"
          value={formData.vendorReference}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="orderDeadline">
          Order Deadline
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="orderDeadline"
          type="date"
          name="orderDeadline"
          value={formData.orderDeadline}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="expectedArrival">
          Expected Arrival
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="expectedArrival"
          type="date"
          name="expectedArrival"
          value={formData.expectedArrival}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Products</h3>
        {formData.products.map((product, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <span>{product.name}</span>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
              className="w-20 px-2 py-1 border rounded"
            />
            <button type="button" onClick={() => removeProduct(index)} className="text-red-500">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
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
      <div className="flex justify-end space-x-2 mt-6">
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

const NewPurchaseOrder = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const vendors = await fetchVendors();
        const products = await fetchProducts();
        dispatch({ type: 'SET_VENDORS', payload: vendors });
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } catch (error) {
        toast.error('Failed to load data');
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
      navigate('/purchase-orders');
    } catch (error) {
      toast.error('Failed to create purchase order');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Purchase Order</h1>
        <div className="flex space-x-2">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center">
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            Send by Email
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center">
            <PrinterIcon className="h-5 w-5 mr-2" />
            Print PO
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Confirm Order
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center">
            <XCircleIcon className="h-5 w-5 mr-2" />
            Cancel
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Create New Purchase Order
      </button>

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

export default NewPurchaseOrder;