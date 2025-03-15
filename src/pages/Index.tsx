
import React, { useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 pt-16">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 px-4 md:px-6 py-8 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Index;
