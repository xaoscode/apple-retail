import { Category, IProduct } from '@repo/interfaces';

export class ProductModel implements IProduct {
  id?: number;
  manufacturer?: string;
  category: Category;
  name: string;
  model?: string;
  article?: string;
  price: number;
  warranty?: number;
  releaseYear?: number;
  count?: number;
  discount: number;
  titleImg: string;
  images?: string[];
  reviewNum?: number;
  date?: Date;
  color?: string;
  camera?: string;
  simCount?: number;
  memory?: number;
  ram?: number;
  batteryLife?: number;
  matrix?: string;
  screenWidthPx?: number;
  screenHeightPx?: number;
  diagonalInch?: number;
  displayHertz?: number;
  processor?: string;
  cores?: number;
  weight?: number;
  length?: number;
  rating: number;
}
