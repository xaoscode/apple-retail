import { Category, IProduct } from '@repo/interfaces';

export class ProductDto implements IProduct {
  date?: Date;
  rating: number;
  id?: number;
  manufacturer: string;
  category: Category;
  name: string;
  model?: string;
  article?: string;
  price: number;
  warranty?: number;
  releaseYear: number;
  count?: number = 0;
  discount: number = 0.0;
  titleImg: string;
  images: string[];
  reviewNum?: number = 0;
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
}
