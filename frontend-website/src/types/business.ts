import type { Area } from "./area";
import type { Category } from "./category";
import type { Contact } from "./contact";
import type { Media } from "./media";
import type { Schedule } from "./schedule";
import type { SocialLinks } from "./socialLinks";

export interface Business {
  documentId: string;

  name: string;
  slug: string;

  shortDescription: string;
  description: any;

  type: string;

  active: boolean;
  verified: boolean;
  featured: boolean;

  businessModel: string;

  acceptsCard: boolean;
  homeDelivery: boolean;

  logo?: {
    url: string;
    alternativeText?: string;
  };

  coverImage?: {
    url: string;
    alternativeText?: string;
  };

  gallery?: {
    url: string;
    alternativeText?: string;
  }[];

  contact?: any;
  location?: any;
  schedule?: any;
  socialLinks?: any;

  area?: {
    documentId: string;
    name: string;
    slug: string;
  };

  categories: {
    documentId: string;
    name: string;
    slug: string;
  }[];
}