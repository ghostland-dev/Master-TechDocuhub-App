
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectsPage = () => {
  const projects = [
    { id: 1, name: 'Project Alpha', status: 'En cours', progress: 75 },
    { id: 2, name: 'Project Beta', status: 'Planifié', progress: 10 },
    { id: 3, name: 'Project Gamma', status: 'Terminé', progress: 100 },
  ];

  return (
    <SidebarProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Projets</h1>
          <p className="text-muted-foreground">Suivez et gérez vos projets en cours.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>Status: {project.status}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progrès</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full transition-all" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default ProjectsPage;
