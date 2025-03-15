
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
import { FileText, Code, CheckSquare, BarChart, ArrowRight } from 'lucide-react';
import { DocumentTemplate } from '@/utils/documentTypes';

interface TemplateCardProps {
  template: DocumentTemplate;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const getIcon = () => {
    switch (template.icon) {
      case 'file-text':
        return <FileText className="h-8 w-8 mb-2 text-primary/70" />;
      case 'code':
        return <Code className="h-8 w-8 mb-2 text-primary/70" />;
      case 'check-square':
        return <CheckSquare className="h-8 w-8 mb-2 text-primary/70" />;
      case 'trending-up':
        return <BarChart className="h-8 w-8 mb-2 text-primary/70" />;
      default:
        return <FileText className="h-8 w-8 mb-2 text-primary/70" />;
    }
  };

  return (
    <Card className="group overflow-hidden border transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <Link to={`/editor/new?template=${template.type}`}>
        <CardHeader className="pb-2">
          {getIcon()}
          <CardTitle className="text-base">{template.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {template.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            <span>Créer</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default TemplateCard;
