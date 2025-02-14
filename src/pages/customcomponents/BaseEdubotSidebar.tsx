import React from 'react';
import { Link } from '@tanstack/react-router';
import BaseEdubotHeader from './BaseEdubotHeader';

const sidebarItems = [
  { label: 'All Program & Courses' },
  { label: 'Manage User' },
  { label: 'Student' },
  { label: 'Organization' },
  { label: 'Manage Program' },
  { label: 'Manage Courses' },
  { label: 'Submissions' },
  { label: 'Manage Batches' },
  { label: 'Data Import/Export' },
  { label: 'Raised Tickets' },
  { label: 'Help and Settings' },
];

const BaseEdubotSidebar: React.FC = () => {
  return (
    <>
    <BaseEdubotHeader/> 
    <aside className="w-64 bg-primary text-white">
      <nav>
        {/* <ul className='py-4'>
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link
                className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors"
                activeProps={{
                  className: "bg-primary-button-pressed"
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul> */}
        <Link to="/" className="block py-2 px-4 font-normal rounded hover:bg-primary-button-pressed transition-colors">Home</Link>
      </nav>
    </aside>
    </>
  );
};

export default BaseEdubotSidebar;