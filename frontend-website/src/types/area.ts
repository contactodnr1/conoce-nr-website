export interface Area {
  documentId: string;

  name: string;
  slug: string;
  description: string;

  icon?: {
    url: string;
    alternativeText?: string;
  };

  coverImage?: {
    url: string;
    alternativeText?: string;
  };
}