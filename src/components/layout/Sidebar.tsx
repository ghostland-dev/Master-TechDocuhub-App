
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar,
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarFooter
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  FolderClosed, 
  Home, 
  PlusCircle,
  Check, 
  BarChart, 
  Settings,
  Archive,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainSidebarProps {
  collapsed?: boolean;
  toggleSidebar: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  
  const mainMenu = [
    { icon: Home, label: 'Tableau de bord', path: '/dashboard' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: FolderClosed, label: 'Projets', path: '/projects' },
    { icon: Check, label: 'Cahiers de recettes', path: '/test-cases' },
    { icon: BarChart, label: 'Rapports', path: '/reports' },
  ];
  
  const extraMenu = [
    { icon: Archive, label: 'Archives', path: '/archives' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
    { icon: HelpCircle, label: 'Aide', path: '/help' },
  ];

  return (
    <Sidebar 
      className={cn(
        "fixed top-0 left-0 h-full transition-all duration-300 border-r z-40",
        collapsed ? "w-20" : "w-64",
        "pt-16" // Add padding for navbar
      )}
    >
      <SidebarContent className="p-3">
        {/* Main Navigation */}
        <SidebarGroup>
          <div className="flex items-center justify-between mb-2">
            <SidebarGroupLabel className={cn(collapsed && "sr-only")}>
              Navigation
            </SidebarGroupLabel>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="h-8 w-8"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground",
                      "justify-start gap-3"
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className={cn(
                        "h-5 w-5",
                        collapsed ? "mx-auto" : ""
                      )} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Create New Document */}
        <div className={cn(
          "my-4",
          collapsed ? "px-2" : "px-3"
        )}>
          <Button 
            variant="default" 
            className={cn(
              "w-full transition-all",
              collapsed ? "justify-center p-2" : "justify-start gap-2"
            )}
            asChild
          >
            <Link to="/editor/new">
              <PlusCircle className="h-5 w-5" />
              {!collapsed && <span>Nouveau document</span>}
            </Link>
          </Button>
        </div>

        {/* Extras */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn(collapsed && "sr-only")}>
            Autres
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {extraMenu.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground",
                      "justify-start gap-3"
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className={cn(
                        "h-5 w-5",
                        collapsed ? "mx-auto" : ""
                      )} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-3 border-t">
        <div className={cn(
          "text-xs text-muted-foreground",
          collapsed && "text-center"
        )}>
          {collapsed ? '© 2023' : '© 2023 DocuTech • v1.0'}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
