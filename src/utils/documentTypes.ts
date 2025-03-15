
export type DocumentType = 'cdc' | 'dst' | 'test-case' | 'sprint-report';

export interface DocumentTemplate {
  id: string;
  name: string;
  type: DocumentType;
  description: string;
  icon: string;
}

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  status: 'draft' | 'review' | 'approved' | 'archived';
  author: string;
  projectId?: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  documents: Document[];
}

// Define document templates
export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'cdc-template',
    name: 'Cahier des Charges',
    type: 'cdc',
    description: 'Template pour la rédaction des cahiers des charges',
    icon: 'file-text'
  },
  {
    id: 'dst-template',
    name: 'Dossier de Spécifications Techniques',
    type: 'dst',
    description: 'Template pour les spécifications techniques détaillées',
    icon: 'code'
  },
  {
    id: 'test-case-template',
    name: 'Cahier de Recettes',
    type: 'test-case',
    description: 'Template pour la rédaction des scénarios de test',
    icon: 'check-square'
  },
  {
    id: 'sprint-report-template',
    name: 'Rapport de Sprint',
    type: 'sprint-report',
    description: 'Template pour les rapports hebdomadaires de sprint',
    icon: 'trending-up'
  }
];

// Sample content for templates
export const getTemplateContent = (type: DocumentType): string => {
  switch (type) {
    case 'cdc':
      return `# Cahier des Charges
      
## 1. Présentation générale du projet
[Description du projet]

## 2. Contexte et objectifs
### 2.1 Contexte
[Contexte du projet]

### 2.2 Objectifs
[Objectifs du projet]

## 3. Public cible et utilisateurs
[Description des utilisateurs]

## 4. Exigences fonctionnelles
[Liste des fonctionnalités]

## 5. Exigences non fonctionnelles
[Performances, sécurité, etc.]

## 6. Contraintes
[Contraintes techniques, budgétaires, etc.]

## 7. Livrables attendus
[Liste des livrables]

## 8. Planning prévisionnel
[Phases et jalons]

## 9. Budget
[Budget prévisionnel]

## 10. Organisation de l'équipe
[Rôles et responsabilités]`;

    case 'dst':
      return `# Dossier de Spécifications Techniques
      
## 1. Architecture technique
[Description de l'architecture]

## 2. Modèle de données
[Description du modèle de données]

## 3. API et interfaces
[Description des API]

## 4. Sécurité
[Mesures de sécurité]

## 5. Performance
[Exigences de performance]

## 6. Technologies utilisées
[Liste des technologies]

## 7. Infrastructure
[Description de l'infrastructure]

## 8. Déploiement
[Processus de déploiement]`;

    case 'test-case':
      return `# Cahier de Recettes
      
## 1. Objectifs des tests
[Objectifs des tests]

## 2. Environnement de test
[Description de l'environnement]

## 3. Périmètre des tests
[Périmètre des tests]

## 4. Scénarios de test
### Scénario 1: [Nom du scénario]
- **Description**: [Description du scénario]
- **Prérequis**: [Prérequis]
- **Étapes**:
  1. [Étape 1]
  2. [Étape 2]
- **Résultat attendu**: [Résultat attendu]
- **Statut**: [ ] Succès [ ] Échec

## 5. Anomalies détectées
[Liste des anomalies]

## 6. Validation
[Validation des tests]`;

    case 'sprint-report':
      return `# Rapport Hebdomadaire de Sprint
      
## 1. Informations générales
- **Sprint**: [Numéro du sprint]
- **Période**: [Date de début] - [Date de fin]
- **Équipe**: [Membres de l'équipe]

## 2. Objectifs du sprint
[Objectifs du sprint]

## 3. Tâches réalisées
[Liste des tâches réalisées]

## 4. Tâches reportées
[Liste des tâches reportées]

## 5. Difficultés rencontrées
[Difficultés rencontrées]

## 6. Risques identifiés
[Risques identifiés]

## 7. Points d'attention
[Points d'attention]

## 8. Métriques
- **Vélocité**: [Vélocité]
- **Burndown**: [Burndown]

## 9. Prochains objectifs
[Prochains objectifs]`;

    default:
      return '';
  }
};

// Mock data
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Cahier des Charges - Projet Alpha',
    type: 'cdc',
    content: getTemplateContent('cdc'),
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-09-20'),
    version: 1.2,
    status: 'approved',
    author: 'Ismail MOUYAYADA',
    projectId: '1',
    tags: ['urgent', 'client-alpha']
  },
  {
    id: '2',
    title: 'Spécifications - Module d\'authentification',
    type: 'dst',
    content: getTemplateContent('dst'),
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2023-09-18'),
    version: 2.1,
    status: 'review',
    author: 'Ismail MOUYAYADA',
    projectId: '1',
    tags: ['technique', 'sécurité']
  },
  {
    id: '3',
    title: 'Tests - Interface utilisateur',
    type: 'test-case',
    content: getTemplateContent('test-case'),
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-09-12'),
    version: 1.0,
    status: 'draft',
    author: 'Ismail MOUYAYADA',
    projectId: '1',
    tags: ['interface', 'tests']
  },
  {
    id: '4',
    title: 'Sprint Report - Semaine 36',
    type: 'sprint-report',
    content: getTemplateContent('sprint-report'),
    createdAt: new Date('2023-09-08'),
    updatedAt: new Date('2023-09-08'),
    version: 1.0,
    status: 'approved',
    author: 'Ismail MOUYAYADA',
    projectId: '1',
    tags: ['sprint', 'rapport']
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Projet Alpha',
    description: 'Refonte du système d\'information',
    createdAt: new Date('2023-09-01'),
    documents: MOCK_DOCUMENTS.filter(doc => doc.projectId === '1')
  },
  {
    id: '2',
    name: 'Projet Beta',
    description: 'Plateforme e-commerce',
    createdAt: new Date('2023-08-15'),
    documents: []
  }
];
