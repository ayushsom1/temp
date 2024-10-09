import React, { useState, useEffect, Fragment } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    type: 'Goods',
    salesPrice: '',
    salesTaxes: '',
    cost: '',
    purchaseTaxes: '',
    category: '',
    reference: '',
    barcode: '',
    hsnCode: '',
    internalNotes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
          Product Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Product Type
        </label>
        <div className="flex space-x-4">
          {['Goods', 'Service', 'Combo'].map((type) => (
            <label key={type} className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value={type}
                checked={formData.type === type}
                onChange={handleChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">{type}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="salesPrice">
            Sales Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
            id="salesPrice"
            type="number"
            name="salesPrice"
            value={formData.salesPrice}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="salesTaxes">
            Sales Taxes
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
            id="salesTaxes"
            type="text"
            name="salesTaxes"
            value={formData.salesTaxes}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="cost">
            Cost
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
            id="cost"
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="purchaseTaxes">
            Purchase Taxes
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
            id="purchaseTaxes"
            type="text"
            name="purchaseTaxes"
            value={formData.purchaseTaxes}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="category">
          Category
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reference">
            Reference
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
            id="reference"
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="barcode">
            Barcode
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
            id="barcode"
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="hsnCode">
          HSN/SAC Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="hsnCode"
          type="text"
          name="hsnCode"
          value={formData.hsnCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="internalNotes">
          Internal Notes
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="internalNotes"
          name="internalNotes"
          value={formData.internalNotes}
          onChange={handleChange}
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
          {product ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

const ProductCard = ({ product, onEdit, onDelete }) => (
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-1">Type: {product.type}</p>
    <p className="text-gray-600 dark:text-gray-300 mb-3">Price: ₹{product.salesPrice}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
        {product.category}
      </span>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);

const Products = () => {
  const { state, dispatch } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const products = await fetchProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [dispatch]);

  const handleCreateProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData);
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      setIsModalOpen(false);
      toast.success('Product created successfully');
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      const updatedProduct = await updateProduct(productData);
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
      setIsModalOpen(false);
      setEditingProduct(null);
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        dispatch({ type: 'DELETE_PRODUCT', payload: productId });
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const openModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
        <button
          onClick={() => openModal()}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Product
        </button>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => openModal(product)}
              onDelete={handleDeleteProduct}
            />
          ))}
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </Dialog.Title>
                  <div className="mt-2">
                    <ProductForm
                      product={editingProduct}
                      onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
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

export default Products;