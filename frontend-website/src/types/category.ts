export interface Category {
  documentId: string;

  name: string;
  slug: string;
  description: string;

  icon?: {
    url: string;
    alternativeText?: string;
  };

  image?: {
    url: string;
    alternativeText?: string;
  };
}