
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  FileText, 
  Edit, 
  MoreHorizontal, 
  PlusCircle, 
  Search, 
  Clock, 
  Download, 
  Trash, 
  Copy, 
  ArrowUp, 
  ArrowDown,
  Filter,
  ListChecks,
  BarChart
} from 'lucide-react';
import { Document, MOCK_DOCUMENTS } from '@/utils/documentTypes';
import { exportToPdf } from '@/utils/pdfExport';
import { Badge } from '@/components/ui/badge';

interface DocumentListProps {
  projectId?: string;
}

const DocumentList: React.FC<DocumentListProps> = ({ projectId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Document>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter documents
  const filteredDocuments = MOCK_DOCUMENTS
    .filter(doc => {
      // Filter by project if projectId is provided
      if (projectId && doc.projectId !== projectId) return false;
      
      // Filter by search term
      return (
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      // Handle date sorting
      if (sortField === 'createdAt' || sortField === 'updatedAt') {
        const dateA = a[sortField].getTime();
        const dateB = b[sortField].getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      // Handle string sorting
      if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
        const strA = a[sortField] as string;
        const strB = b[sortField] as string;
        return sortDirection === 'asc' 
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }
      
      // Handle number sorting
      if (typeof a[sortField] === 'number' && typeof b[sortField] === 'number') {
        const numA = a[sortField] as number;
        const numB = b[sortField] as number;
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }
      
      return 0;
    });

  // Sort handler
  const handleSort = (field: keyof Document) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Document type label and icon
  const getDocumentTypeInfo = (type: string) => {
    switch (type) {
      case 'cdc':
        return { label: 'Cahier des charges', icon: <FileText className="h-4 w-4" /> };
      case 'dst':
        return { label: 'Spécifications techniques', icon: <Edit className="h-4 w-4" /> };
      case 'test-case':
        return { label: 'Cahier de recettes', icon: <ListChecks className="h-4 w-4" /> };
      case 'sprint-report':
        return { label: 'Rapport de sprint', icon: <BarChart className="h-4 w-4" /> };
      default:
        return { label: 'Document', icon: <FileText className="h-4 w-4" /> };
    }
  };

  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/30">Brouillon</Badge>;
      case 'review':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30">En validation</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/30">Approuvé</Badge>;
      case 'archived':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700/50">Archivé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Handle PDF export
  const handleExport = async (document: Document) => {
    try {
      await exportToPdf(document);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="text-2xl font-bold">Documents</h1>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-full pl-10 md:w-[240px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrer par type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSearchTerm('cdc')}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Cahiers des charges</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm('dst')}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Spécifications techniques</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm('test-case')}>
                <ListChecks className="mr-2 h-4 w-4" />
                <span>Cahiers de recettes</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm('sprint-report')}>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Rapports de sprint</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSearchTerm('')}>
                Réinitialiser les filtres
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button asChild>
            <Link to="/editor/new" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden md:inline-block">Nouveau document</span>
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Document Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">
                <div 
                  className="flex items-center gap-1 cursor-pointer" 
                  onClick={() => handleSort('title')}
                >
                  <span>Document</span>
                  {sortField === 'title' && (
                    sortDirection === 'asc' ? 
                      <ArrowUp className="h-3 w-3" /> : 
                      <ArrowDown className="h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <div 
                  className="flex items-center gap-1 cursor-pointer" 
                  onClick={() => handleSort('status')}
                >
                  <span>Statut</span>
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? 
                      <ArrowUp className="h-3 w-3" /> : 
                      <ArrowDown className="h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center gap-1 cursor-pointer" 
                  onClick={() => handleSort('updatedAt')}
                >
                  <span>Dernière modif.</span>
                  {sortField === 'updatedAt' && (
                    sortDirection === 'asc' ? 
                      <ArrowUp className="h-3 w-3" /> : 
                      <ArrowDown className="h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>Version</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-8 w-8 mb-2 opacity-40" />
                    <span>Aucun document trouvé</span>
                    <span className="text-sm">Essayez de modifier vos filtres ou créez un nouveau document</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="group">
                  <TableCell>
                    <Link 
                      to={`/editor/${doc.id}`}
                      className="block hover:underline font-medium group-hover:text-primary transition-colors"
                    >
                      {doc.title}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      Par {doc.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDocumentTypeInfo(doc.type).icon}
                      <span>{getDocumentTypeInfo(doc.type).label}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{doc.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>v{doc.version}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/editor/${doc.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport(doc)}>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Exporter en PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Dupliquer</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentList;
