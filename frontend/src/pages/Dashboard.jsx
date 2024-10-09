// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, value, link }) => (
  <Link to={link} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{value}</p>
  </Link>
);

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Purchase Orders" value="24" link="/purchase-orders" />
        <DashboardCard title="Pending Approvals" value="3" link="/purchase-orders" />
        <DashboardCard title="Total Spend" value="₹2,15,651.10" link="/purchase-orders" />
      </div>
    </div>
  );
};

export default Dashboard;