export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  category: Category;
  description: string;
  features: string[];
  color: string;
  accentColor: string;
  soldOut: boolean;
  hasLanding?: boolean;
  image?: string;
}

export type Category =
  | "ortopediche"
  | "posturali"
  | "fitness"
  | "trekking";

export const categoryLabels: Record<Category, string> = {
  ortopediche: "Calzature Ortopediche",
  posturali: "Calzature Posturali",
  fitness: "Calzature Fitness",
  trekking: "Calzature Trekking",
};
