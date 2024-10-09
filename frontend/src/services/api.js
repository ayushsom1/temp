// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchPurchaseOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/purchase-orders`);
  return handleResponse(response);
};

export const createPurchaseOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/purchase-orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return handleResponse(response);
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return handleResponse(response);
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

export const updateProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products/${productData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

export const deleteProduct = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const fetchVendors = async () => {
  const response = await fetch(`${API_BASE_URL}/vendors`);
  return handleResponse(response);
};

export const createVendor = async (vendorData) => {
  const response = await fetch(`${API_BASE_URL}/vendors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vendorData),
  });
  return handleResponse(response);
};

export const updateVendor = async (vendorData) => {
  const response = await fetch(`${API_BASE_URL}/vendors/${vendorData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vendorData),
  });
  return handleResponse(response);
};

export const deleteVendor = async (vendorId) => {
  const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};