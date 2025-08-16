export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  externalLink?: string;
  status: 'upcoming' | 'live' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  rules?: string[];
  details?: string;
  likes?: number;
  agenda?: string;
  coordinators?: string[]; // Names of event coordinators
  registrationLink?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  externalLink?: string;
  status: 'upcoming' | 'live' | 'completed';
  rules?: string[];
  details?: string;
  likes?: number;
  agenda?: string;
  coordinators?: string[]; // Names of event coordinators
  registrationLink?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  imageUrl?: string;
}