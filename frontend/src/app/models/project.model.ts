export interface Project {
  id: string;
  name: string;
  category: string;
  location: string;
  year: number;
  area: string;
  budget: string;
  architect: string;
  client: string;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  features: string[];
  views: number;
  featured?: boolean;
  createdAt?: string;
}

export interface Inquiry {
  id: string;
  projectId: string;
  projectName?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: string;
}

