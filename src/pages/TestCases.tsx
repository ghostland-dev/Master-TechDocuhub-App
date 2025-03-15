
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

const TestCasesPage = () => {
  const testCases = [
    { id: 1, name: 'Authentication Flow', status: 'Passed', date: '2023-05-12' },
    { id: 2, name: 'Document Generation', status: 'Failed', date: '2023-05-15' },
    { id: 3, name: 'User Registration', status: 'Pending', date: '2023-05-18' },
  ];

  return (
    <SidebarProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Cahiers de recettes</h1>
          <p className="text-muted-foreground">Suivez les tests et validations de vos produits.</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Tests récents</CardTitle>
              <CardDescription>Résultats des tests récemment exécutés.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testCases.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            test.status === 'Passed' ? 'default' : 
                            test.status === 'Failed' ? 'destructive' : 'outline'
                          }
                        >
                          {test.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>
                        <a href="#" className="text-primary hover:underline">Détails</a>
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

export default TestCasesPage;
