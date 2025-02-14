import React from 'react';
// import { Link } from '@tanstack/react-router';
import { Link } from 'react-router-dom';

import BaseEdubotHeader from './BaseEdubotHeader';

const BaseEdubotSidebar: React.FC = () => {
  // const [isSidebarOpen,setIsSidebarOpen] = useState(false);
  return (
    <>
    <nav className="fixed w-full lg:w-[calc(100%-16rem)] right-0 z-20 bg-[#F1F1F1]">
    <div className=" ">
    
    <BaseEdubotHeader/> 
    </div>
    </nav>
    <aside className="fixed inset-y-0 left-0 w-64 transform lg:translate-x-0 transition duration-200 ease-in-out z-30 lg:z-10">
      <div className='bg-[#13144F] text-white p-6 flex flex-col h-full'>
      <nav>
         <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">All Program& Courses</Link>
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
    </>
  );
};

export default BaseEdubotSidebar;