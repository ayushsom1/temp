import React, { useState, useEffect, Fragment } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchVendors, createVendor, updateVendor, deleteVendor } from '../services/api';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const VendorForm = ({ vendor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(vendor || {
    name: '',
    email: '',
    phone: '',
    gstTreatment: 'Consumer',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
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
          Vendor Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          GST Treatment
        </label>
        <select
          name="gstTreatment"
          value={formData.gstTreatment}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
        >
          <option value="Consumer">Consumer</option>
          <option value="Registered Business">Registered Business</option>
          <option value="Unregistered Business">Unregistered Business</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="state"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="country">
            Country
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="country"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="pincode">
            Pincode
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="pincode"
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
        >
          {vendor ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

const VendorCard = ({ vendor, onEdit, onDelete }) => (
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{vendor.name}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-1">{vendor.email}</p>
    <p className="text-gray-600 dark:text-gray-300 mb-3">{vendor.phone}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
        {vendor.gstTreatment}
      </span>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(vendor)}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(vendor.id)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);

const Vendors = () => {
  const { state, dispatch } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  useEffect(() => {
    const loadVendors = async () => {
      try {
        const vendors = await fetchVendors();
        dispatch({ type: 'SET_VENDORS', payload: vendors });
      } catch (error) {
        toast.error('Failed to load vendors');
      }
    };
    loadVendors();
  }, [dispatch]);

  const handleCreateVendor = async (vendorData) => {
    try {
      const newVendor = await createVendor(vendorData);
      dispatch({ type: 'ADD_VENDOR', payload: newVendor });
      setIsModalOpen(false);
      toast.success('Vendor created successfully');
    } catch (error) {
      toast.error('Failed to create vendor');
    }
  };

  const handleUpdateVendor = async (vendorData) => {
    try {
      const updatedVendor = await updateVendor(vendorData);
      dispatch({ type: 'UPDATE_VENDOR', payload: updatedVendor });
      setIsModalOpen(false);
      setEditingVendor(null);
      toast.success('Vendor updated successfully');
    } catch (error) {
      toast.error('Failed to update vendor');
    }
  };

  const handleDeleteVendor = async (vendorId) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await deleteVendor(vendorId);
        dispatch({ type: 'DELETE_VENDOR', payload: vendorId });
        toast.success('Vendor deleted successfully');
      } catch (error) {
        toast.error('Failed to delete vendor');
      }
    }
  };

  const openModal = (vendor = null) => {
    setEditingVendor(vendor);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vendors</h1>
        <button
          onClick={() => openModal()}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Vendor
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onEdit={() => openModal(vendor)}
            onDelete={handleDeleteVendor}
          />
        ))}
      </div>

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
                    {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
                  </Dialog.Title>
                  <div className="mt-2">
                    <VendorForm
                      vendor={editingVendor}
                      onSubmit={editingVendor ? handleUpdateVendor : handleCreateVendor}
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

export default Vendors;