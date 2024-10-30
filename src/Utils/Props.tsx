import { Interface } from "readline";

export interface SliderProps {
  isLoading: boolean;
  items: {
    id?: number;
    title?: string;
    image?: string;
    slug?: string;
  }[];
}

export interface HomeSliderProps {
  id?: number;
  title?: string;
  image?: string;
  slug?: string;
}


export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  title: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  subCategory?: Subcategory[];
  title: string;
}
export interface Marque {
  id: number;
  name: string;
  slug: string;
  image: string;
  title: string;
  logo: string;
}
export interface Product {
  id: number;
  reference: string;
  title: string;
  slug: string;
  sellingPrice: number;
  stock: number;
  disponibilite: string;
  description: string;
  howToUse: string;
  ingredients: string;
  image: string;
  marque: Marque;
}

