
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Document, MOCK_DOCUMENTS, DocumentType, getTemplateContent } from '@/utils/documentTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Save,
  Download,
  Eye,
  Code,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  History,
  Share,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { exportToPdf } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocumentEditorProps {
  documentId?: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ documentId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const isNewDocument = !documentId;
  const templateType = searchParams.get('template') as DocumentType;
  
  // Find existing document or create new one
  const [document, setDocument] = useState<Document>(() => {
    if (isNewDocument) {
      const now = new Date();
      return {
        id: Date.now().toString(),
        title: templateType 
          ? `Nouveau ${templateType === 'cdc' ? 'cahier des charges' : 
              templateType === 'dst' ? 'dossier de spécifications' : 
              templateType === 'test-case' ? 'cahier de recettes' : 
              'rapport de sprint'}`
          : 'Nouveau document',
        type: templateType || 'cdc',
        content: templateType ? getTemplateContent(templateType) : '',
        createdAt: now,
        updatedAt: now,
        version: 1.0,
        status: 'draft',
        author: 'Ismail MOUYAYADA',
        tags: []
      };
    }
    
    const existingDocument = MOCK_DOCUMENTS.find(doc => doc.id === documentId);
    if (!existingDocument) {
      navigate('/documents');
      return {} as Document;
    }
    
    return { ...existingDocument };
  });
  
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);
  const [activeTab, setActiveTab] = useState('edit');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // Update document when content changes
  useEffect(() => {
    if (title !== document.title || content !== document.content) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [title, content, document]);
  
  // Save document
  const handleSave = () => {
    const updatedDocument = {
      ...document,
      title,
      content,
      updatedAt: new Date()
    };
    
    setDocument(updatedDocument);
    setUnsavedChanges(false);
    
    // In a real app, save to backend
    toast({
      title: "Document sauvegardé",
      description: "Toutes les modifications ont été enregistrées."
    });
  };
  
  // Export to PDF
  const handleExport = async () => {
    try {
      await exportToPdf(document);
      toast({
        title: "Export réussi",
        description: "Le document a été exporté en PDF."
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter le document en PDF.",
        variant: "destructive"
      });
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/30">
            Brouillon
          </Badge>
        );
      case 'review':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30">
            En validation
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/30">
            Approuvé
          </Badge>
        );
      case 'archived':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700/50">
            Archivé
          </Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const handleUpdateStatus = (newStatus: 'draft' | 'review' | 'approved' | 'archived') => {
    const updatedDocument = {
      ...document,
      status: newStatus,
      updatedAt: new Date()
    };
    
    setDocument(updatedDocument);
    
    // In a real app, save to backend
    toast({
      title: "Statut mis à jour",
      description: `Le document est maintenant ${
        newStatus === 'draft' ? 'en brouillon' : 
        newStatus === 'review' ? 'en validation' : 
        newStatus === 'approved' ? 'approuvé' : 
        'archivé'
      }.`
    });
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden animate-fade-in">
      {/* Editor Header */}
      <div className="border-b p-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/documents')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold border-0 p-0 h-auto focus-visible:ring-0"
              placeholder="Titre du document"
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <FileText className="h-3 w-3" />
              <span>
                {document.type === 'cdc' ? 'Cahier des charges' : 
                 document.type === 'dst' ? 'Dossier de spécifications' : 
                 document.type === 'test-case' ? 'Cahier de recettes' : 
                 'Rapport de sprint'}
              </span>
              <span className="text-muted-foreground/50">•</span>
              {getStatusBadge(document.status)}
              {!isNewDocument && (
                <>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Modifié le {document.updatedAt.toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {unsavedChanges && (
            <div className="flex items-center gap-1 text-yellow-600 text-sm mr-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Non sauvegardé</span>
            </div>
          )}
          
          <Button 
            variant={unsavedChanges ? "default" : "outline"}
            className="gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            <span>Enregistrer</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                <span>Exporter en PDF</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Share className="mr-2 h-4 w-4" />
                <span>Partager</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <History className="mr-2 h-4 w-4" />
                <span>Historique des versions</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => handleUpdateStatus('draft')}>
                <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
                <span>Brouillon</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => handleUpdateStatus('review')}>
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
                <span>En validation</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => handleUpdateStatus('approved')}>
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span>Approuvé</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => handleUpdateStatus('archived')}>
                <div className="h-2 w-2 rounded-full bg-gray-500 mr-2" />
                <span>Archivé</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Editor Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-4">
          <TabsList className="h-[42px]">
            <TabsTrigger value="edit" className="gap-2 data-[state=active]:bg-muted">
              <Code className="h-4 w-4" />
              <span>Éditer</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-muted">
              <Eye className="h-4 w-4" />
              <span>Aperçu</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="flex-1 p-0 m-0 overflow-auto">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-full border-0 rounded-none focus-visible:ring-0 resize-none p-4 font-mono text-sm"
            placeholder="Contenu du document (format Markdown supporté)"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="flex-1 p-6 m-0 overflow-auto bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto prose prose-zinc dark:prose-invert document-editor prose-headings:scroll-m-20">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentEditor;
