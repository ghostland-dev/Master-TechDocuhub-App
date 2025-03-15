
import React, { useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex flex-col w-full">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <div className="flex flex-1 pt-16">
          <Sidebar collapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 px-4 md:px-6 py-8 overflow-y-auto">
            <Dashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
