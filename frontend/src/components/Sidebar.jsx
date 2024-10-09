// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, CubeIcon, DocumentTextIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const SidebarItem = ({ to, icon: Icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center p-2 my-1 rounded transition-all ${
        isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-purple-500 hover:text-white'
      }`}
    >
      <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
      {!isCollapsed && <span className="text-xs">{label}</span>}
    </Link>
  );
};

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`bg-gray-900 text-white transition-all duration-200 ${isCollapsed ? 'w-16' : 'w-48'} flex flex-col`}>
      <div className="flex justify-between items-center p-2  border-gray-700">
        {!isCollapsed && <h1 className="text-sm font-bold text-purple-400"></h1>}
        <button 
          onClick={toggleSidebar} 
          className="ml-3 p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          {isCollapsed ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex-grow py-4 px-2 space-y-1">
        <SidebarItem to="/" icon={HomeIcon} label="Dashboard" isCollapsed={isCollapsed} />
        <SidebarItem to="/vendors" icon={UsersIcon} label="Vendors" isCollapsed={isCollapsed} />
        <SidebarItem to="/products" icon={CubeIcon} label="Products" isCollapsed={isCollapsed} />
        <SidebarItem to="/purchase-orders" icon={DocumentTextIcon} label="Purchase Orders" isCollapsed={isCollapsed} />
      </nav>
    </div>
  );
};

export default Sidebar;