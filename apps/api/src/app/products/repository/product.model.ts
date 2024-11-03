import { Category, IProduct } from '@repo/interfaces';
import { Expose } from 'class-transformer';

export class ProductModel implements IProduct {
  id?: number;
  manufacturer?: string;
  category: Category;
  name: string;
  model?: string;
  article?: string;
  price: number;
  warranty?: number;
  @Expose({ name: 'release_year' })
  releaseYear?: number;
  count?: number;
  discount: number;
  @Expose({ name: 'title_img' })
  titleImg: string;
  images?: string[];
  @Expose({ name: 'review_num' })
  reviewNum?: number;
  date?: Date;
  color?: string;
  camera?: string;
  @Expose({ name: 'sim_count' })
  simCount?: number;
  memory?: number;
  ram?: number;
  @Expose({ name: 'battery_life' })
  batteryLife?: number;
  matrix?: string;
  @Expose({ name: 'screen_width_px' })
  screenWidthPx?: number;
  @Expose({ name: 'screen_height_px' })
  screenHeightPx?: number;
  @Expose({ name: 'diagonal_inch' })
  diagonalInch?: number;
  @Expose({ name: 'display_hertz' })
  displayHertz?: number;
  processor?: string;
  cores?: number;
  weight?: number;
  length?: number;
  rating: number;
}
