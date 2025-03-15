
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentList from '@/components/documents/DocumentList';

const DocumentsPage = () => {
  return (
    <SidebarProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Gérez et organisez vos documents importants.</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Documents récents</CardTitle>
              <CardDescription>Vos documents les plus récemment consultés ou modifiés.</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentList />
            </CardContent>
          </Card>
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default DocumentsPage;
