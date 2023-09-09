import { Image, Product } from './ProductInterface';

// Categorie Interface to use in Frontend
export interface Categorie {
  id?: number;
  title: string;
  description?: string;
  price?: string;
  image?: Array<Image>;
  period?: string;
  brand?: string;
  delivery?: string;
  products?: Array<Product>;
  discount?: string;
  type?: string;
  categorie_id?: number | string;
}
