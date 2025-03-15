
import React from 'react';
import { useParams } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';
import DocumentEditor from '@/components/documents/DocumentEditor';

const EditorPage = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  return (
    <SidebarProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {isNew ? 'Nouveau document' : 'Modifier le document'}
          </h1>
          <DocumentEditor documentId={!isNew ? id : undefined} />
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default EditorPage;
