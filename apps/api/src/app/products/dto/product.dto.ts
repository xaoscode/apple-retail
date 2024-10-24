import { Category, IProduct } from '@repo/interfaces';

export class ProductDto implements IProduct {
  id?: string;
  manufacturer: string;
  category: Category;
  name: string;
  model?: string;
  ram?: number;
  memory?: number;
  screenSize?: number;
  batteryLife?: number;
  releaseYear?: number;
  titleImg: string;
  images: string[];
  price: number;
  discountPercentage?: number;
  reviewNum: number;
}
