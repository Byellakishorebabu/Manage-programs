import React from 'react';
import { Outlet } from '@tanstack/react-router';
import BaseEdubotHeader from './BaseEdubotHeader';
import BaseEdubotSidebar from './BaseEdubotSidebar';


const BaseEdubotLayout: React.FC = () => {
  return (
      <div className="tw-flex tw-flex-col tw-h-screen">
        <BaseEdubotHeader />
        <div className="tw-flex tw-flex-1 tw-overflow-hidden">
          <BaseEdubotSidebar />
          <main className="tw-flex-1 tw-overflow-auto tw-p-6">
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default BaseEdubotLayout;