import React, { useState } from 'react';
// import { Link } from '@tanstack/react-router';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import BaseEdubotHeader from './BaseEdubotHeader';

const BaseEdubotSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="fixed w-full lg:w-[calc(100%-16rem)] right-0 z-20 bg-[#F1F1F1]">
        <div className="relative">
          {/* Hamburger menu button for mobile */}
          <button 
            className="lg:hidden absolute left-4 top-5 z-50 text-[#13144F]"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <BaseEdubotHeader />
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40 lg:z-10`}>
        <div className='bg-[#13144F] text-white p-6 flex flex-col h-full'>
          <nav className="space-y-2">
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">
              All Program & Courses
            </Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Manage User</Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Student </Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Organization</Link>
            <Link to="/managerprogram" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Manage Programs</Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Manage Courses</Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Submissions</Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Manage Batches</Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Data Import/Export</Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Raised Tickets </Link>
            <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Help and Settings</Link>
          </nav>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className={`lg:ml-64 transition-all duration-200 ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default BaseEdubotSidebar;