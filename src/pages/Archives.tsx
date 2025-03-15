
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const ArchivesPage = () => {
  const archivedItems = [
    { id: 1, name: 'Rapport 2022', type: 'Document', archivedDate: '2023-01-15' },
    { id: 2, name: 'Projet Expansion', type: 'Projet', archivedDate: '2022-11-30' },
    { id: 3, name: 'Tests Q3 2022', type: 'Cahier de recettes', archivedDate: '2022-10-05' },
  ];

  return (
    <SidebarProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Archives</h1>
          <p className="text-muted-foreground">Accédez aux documents et projets archivés.</p>
          
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher dans les archives..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">Filtrer</Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Éléments archivés</CardTitle>
              <CardDescription>Documents, projets et tests qui ont été archivés.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date d'archivage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.archivedDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Restaurer</Button>
                          <Button variant="ghost" size="sm">Voir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default ArchivesPage;
