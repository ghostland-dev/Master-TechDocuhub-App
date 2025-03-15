
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  FileText, 
  FolderOpen, 
  Clock, 
  ChevronRight, 
  PlusCircle, 
  ListChecks,
  Calendar,
  Edit,
  BarChart,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Document, MOCK_DOCUMENTS, DOCUMENT_TEMPLATES, MOCK_PROJECTS } from '@/utils/documentTypes';

const Dashboard: React.FC = () => {
  // Sort documents by updatedAt date (newest first)
  const recentDocuments = [...MOCK_DOCUMENTS]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-2">
                Bienvenue, Ismail
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Gérez vos documents techniques</h1>
              <p className="text-muted-foreground max-w-md">
                Créez, organisez et partagez tous vos documents techniques en un seul endroit.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link to="/editor/new" className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Nouveau document</span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/projects" className="gap-2">
                  <FolderOpen className="h-4 w-4" />
                  <span>Voir les projets</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-background/60 backdrop-blur-sm transition-all hover:shadow-md border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">{MOCK_DOCUMENTS.length}</div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/60 backdrop-blur-sm transition-all hover:shadow-md border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">{MOCK_PROJECTS.length}</div>
                <FolderOpen className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/60 backdrop-blur-sm transition-all hover:shadow-md border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">En validation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">
                  {MOCK_DOCUMENTS.filter(doc => doc.status === 'review').length}
                </div>
                <ListChecks className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/60 backdrop-blur-sm transition-all hover:shadow-md border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dernière mise à jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">
                  {new Date().toLocaleDateString()}
                </div>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Documents */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Documents récents</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/documents" className="gap-1">
              <span>Voir tout</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          {recentDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </section>
      
      {/* Templates Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Créer un document</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/templates" className="gap-1">
              <span>Tous les templates</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {DOCUMENT_TEMPLATES.map((template) => (
            <Card key={template.id} className="group overflow-hidden border transition-all duration-300 hover:shadow-md hover:border-primary/20">
              <Link to={`/editor/new?template=${template.type}`}>
                <CardHeader className="pb-2">
                  {template.icon === 'file-text' && <FileText className="h-8 w-8 mb-2 text-primary/70" />}
                  {template.icon === 'code' && <Edit className="h-8 w-8 mb-2 text-primary/70" />}
                  {template.icon === 'check-square' && <ListChecks className="h-8 w-8 mb-2 text-primary/70" />}
                  {template.icon === 'trending-up' && <BarChart className="h-8 w-8 mb-2 text-primary/70" />}
                  <CardTitle className="text-base">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    <span>Créer</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Projects Progress */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Progression des projets</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/projects" className="gap-1">
              <span>Voir tout</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6">
            {MOCK_PROJECTS.map((project, index) => (
              <div key={project.id} className={`${index > 0 ? 'mt-6 pt-6 border-t' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/projects/${project.id}`}>Détails</Link>
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div>Progression</div>
                    <div className="font-medium">
                      {project.id === '1' ? '65%' : '30%'}
                    </div>
                  </div>
                  <Progress value={project.id === '1' ? 65 : 30} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const DocumentCard: React.FC<{ document: Document }> = ({ document }) => {
  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'cdc':
        return <FileText className="h-4 w-4" />;
      case 'dst':
        return <Edit className="h-4 w-4" />;
      case 'test-case':
        return <ListChecks className="h-4 w-4" />;
      case 'sprint-report':
        return <BarChart className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
    }
  };

  return (
    <Card className="overflow-hidden border transition-all hover:shadow-md hover:border-primary/20">
      <Link to={`/editor/${document.id}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {getDocumentTypeIcon(document.type)}
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {document.type === 'cdc' ? 'Cahier des charges' : 
                    document.type === 'dst' ? 'Spécifications techniques' : 
                    document.type === 'test-case' ? 'Cahier de recettes' : 
                    'Rapport de sprint'}
                </div>
              </div>
            </div>
            <div className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(document.status)}`}>
              {document.status === 'draft' ? 'Brouillon' : 
               document.status === 'review' ? 'En validation' : 
               document.status === 'approved' ? 'Approuvé' : 
               'Archivé'}
            </div>
          </div>
          <CardTitle className="text-lg mt-2">{document.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="line-clamp-2 text-sm text-muted-foreground">
            {document.content.substring(0, 100)}...
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{document.updatedAt.toLocaleDateString()}</span>
          </div>
          <div>Version {document.version}</div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default Dashboard;
