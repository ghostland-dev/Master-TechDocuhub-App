
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  return (
    <SidebarProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">Gérez les paramètres de votre compte et de l'application.</p>
          
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="account">Compte</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profil</CardTitle>
                  <CardDescription>Modifiez vos informations personnelles.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" defaultValue="Jean Dupont" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Input id="bio" defaultValue="Chef de projet senior chez DocuTech." />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Enregistrer les modifications</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Compte</CardTitle>
                  <CardDescription>Gérez les paramètres de votre compte.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <select 
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <select 
                      id="timezone"
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="utc+1">Europe/Paris (UTC+1)</option>
                      <option value="utc+0">Europe/London (UTC+0)</option>
                      <option value="utc-5">America/New_York (UTC-5)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme">Thème sombre</Label>
                    <Switch id="theme" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Enregistrer les modifications</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configurez vos préférences de notification.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifs">Notifications par email</Label>
                    <Switch id="email-notifs" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifs">Notifications push</Label>
                    <Switch id="push-notifs" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="update-notifs">Mises à jour de projets</Label>
                    <Switch id="update-notifs" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-notifs">Communications marketing</Label>
                    <Switch id="marketing-notifs" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Enregistrer les préférences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default SettingsPage;
