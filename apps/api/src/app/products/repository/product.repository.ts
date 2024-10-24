import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import DatabaseService from 'src/app/core/database/database.service';
import { ProductModel } from './product.model';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async addProduct(product: ProductDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        INSERT INTO product 
          (manufacturer, category, name, model, ram, memory, screen_size, battery_life, release_year, title_img, images, price, discount_percentage, review_num)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *
      `,
      [
        product.manufacturer,
        product.category,
        product.name,
        product.model || null,
        product.ram || null,
        product.memory || null,
        product.screenSize || null,
        product.batteryLife || null,
        product.releaseYear || null,
        product.titleImg,
        product.images,
        product.price,
        product.discountPercentage || null,
        product.reviewNum,
      ],
    );
    return plainToInstance(ProductModel, databaseResponse.rows);
  }

  async getProductById(id: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        SELECT * 
        FROM product
        WHERE id = $1
      `,
      [id],
    );
    return plainToInstance(ProductModel, databaseResponse.rows);
  }
}
