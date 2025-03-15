
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, BookOpen, FileQuestion } from 'lucide-react';

const HelpPage = () => {
  const faqs = [
    { 
      question: 'Comment créer un nouveau document ?', 
      answer: 'Pour créer un nouveau document, cliquez sur le bouton "Nouveau document" dans la barre latérale. Vous pourrez ensuite choisir un modèle ou commencer avec un document vide.' 
    },
    { 
      question: 'Comment partager mes documents avec d\'autres utilisateurs ?', 
      answer: 'Dans la vue document, cliquez sur le bouton "Partager" en haut à droite. Vous pourrez alors ajouter des collaborateurs par email et définir leurs permissions.' 
    },
    { 
      question: 'Comment exporter mes documents en PDF ?', 
      answer: 'Ouvrez le document que vous souhaitez exporter, puis cliquez sur le menu "Fichier" et sélectionnez "Exporter en PDF". Vous pourrez ensuite télécharger le fichier PDF.' 
    },
    { 
      question: 'Comment archiver un projet ?', 
      answer: 'Depuis la liste des projets, cliquez sur les trois points à côté du projet que vous souhaitez archiver, puis sélectionnez "Archiver". Le projet sera déplacé dans la section Archives.' 
    },
  ];

  return (
    <SidebarProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Aide</h1>
          <p className="text-muted-foreground">Centre d'aide et ressources pour l'utilisation de DocuTech.</p>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une question ou un sujet..."
              className="pl-8"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Guides et tutoriels détaillés</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><a href="#" className="text-primary hover:underline">Guide de démarrage</a></li>
                  <li><a href="#" className="text-primary hover:underline">Manuel d'utilisation</a></li>
                  <li><a href="#" className="text-primary hover:underline">Tutoriels vidéo</a></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Support</CardTitle>
                  <CardDescription>Contactez notre équipe</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Besoin d'aide pour résoudre un problème spécifique ?</p>
                <Button className="w-full">Contacter le support</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <FileQuestion className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>FAQ</CardTitle>
                  <CardDescription>Questions fréquemment posées</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Consultez notre base de connaissances pour des réponses rapides.</p>
                <a href="#faq" className="text-primary hover:underline text-sm">Voir toutes les FAQ</a>
              </CardContent>
            </Card>
          </div>
          
          <Card id="faq">
            <CardHeader>
              <CardTitle>Questions fréquemment posées</CardTitle>
              <CardDescription>Trouvez rapidement des réponses aux questions courantes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default HelpPage;
