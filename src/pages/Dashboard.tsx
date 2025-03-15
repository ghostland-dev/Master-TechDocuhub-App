
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </SidebarProvider>
  );
};

export default DashboardPage;
