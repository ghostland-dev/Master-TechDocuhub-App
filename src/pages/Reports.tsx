
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReportsPage = () => {
  const monthlyData = [
    { name: 'Jan', documents: 40, projects: 24 },
    { name: 'Fév', documents: 30, projects: 13 },
    { name: 'Mar', documents: 20, projects: 18 },
    { name: 'Avr', documents: 27, projects: 15 },
    { name: 'Mai', documents: 18, projects: 12 },
    { name: 'Juin', documents: 23, projects: 19 },
  ];

  return (
    <SidebarProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
          <p className="text-muted-foreground">Visualisez les métriques et statistiques importantes.</p>
          
          <Tabs defaultValue="monthly">
            <TabsList>
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
              <TabsTrigger value="quarterly">Trimestriel</TabsTrigger>
              <TabsTrigger value="yearly">Annuel</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Activité mensuelle</CardTitle>
                  <CardDescription>Documents créés et projets lancés par mois.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="documents" name="Documents" fill="#4C9AFF" />
                        <Bar dataKey="projects" name="Projets" fill="#6554C0" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quarterly">
              <Card>
                <CardHeader>
                  <CardTitle>Activité trimestrielle</CardTitle>
                  <CardDescription>Choisissez cette vue pour les données trimestrielles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-60">
                    <p className="text-muted-foreground">Données trimestrielles à venir</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="yearly">
              <Card>
                <CardHeader>
                  <CardTitle>Activité annuelle</CardTitle>
                  <CardDescription>Visualisez les tendances sur l'année entière.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-60">
                    <p className="text-muted-foreground">Données annuelles à venir</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default ReportsPage;
