export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  shortDescription: string;
  githubUrl: string;
  technologies: string[];
  features: string[];
  color: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string;
  contribution: string;
  improvements: string;
  status: string;
  featured: boolean;
};
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  errors?: Record<string, string>;
};
export type SkillGroup = {
  category: string;
  level: string;
  technologies: string[];
};
export type JourneyItem = { title: string; organization: string; description: string };
