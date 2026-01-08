export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  features?: string[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  client?: string;
  year: number;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

// TeamMember type is now defined in src/data/team.ts as TeamMemberData
// Translatable fields (name, position, bio) are stored in messages/*.json under about.team

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
}

