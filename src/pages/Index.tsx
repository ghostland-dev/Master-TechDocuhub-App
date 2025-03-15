
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard when visiting the root path
    navigate('/dashboard');
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex justify-center items-center w-full">
        <p>Redirection...</p>
      </div>
    </SidebarProvider>
  );
};

export default Index;
