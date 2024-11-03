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
        INSERT INTO products 
          (
            manufacturer, category, name, model, article, price, warranty, release_year, count, discount, 
            title_img, images, reviewNum, color, camera, sim_count, memory, ram, battery_life, 
            matrix, screen_width_px, screen_height_px, diagonal_inch, display_hertz, processor, 
            cores, weight, length
          )
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
           $11, $12, $13, $14, $15, $16, $17, $18, $19, 
           $20, $21, $22, $23, $24, $25, $26, $27, $28)
        RETURNING *
      `,
      [
        product.manufacturer,
        product.category,
        product.name,
        product.model || null,
        product.article || null,
        product.price,
        product.warranty || null,
        product.releaseYear || null,
        product.count || 0,
        product.discount || 0.0,
        product.titleImg,
        product.images || [],
        product.reviewNum || 0,
        product.color || null,
        product.camera || null,
        product.simCount || null,
        product.memory || null,
        product.ram || null,
        product.batteryLife || null,
        product.matrix || null,
        product.screenWidthPx || null,
        product.screenHeightPx || null,
        product.diagonalInch || null,
        product.displayHertz || null,
        product.processor || null,
        product.cores || null,
        product.weight || null,
        product.length || null,
      ],
    );
    return plainToInstance(ProductModel, databaseResponse.rows[0]);
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
  async getProducts() {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT *
      FROM products
      WHERE category = 'smartphones'
      LIMIT 6;`,
    );
    return plainToInstance(ProductModel, databaseResponse.rows);
  }
  async querySearch(query: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * 
      FROM products
      WHERE name ILIKE '%' || $1 || '%' OR manufacturer ILIKE '%' || $1 || '%' OR model ILIKE '%' || $1 || '%'
      LIMIT 10;
      `,
      [query],
    );
    return plainToInstance(ProductModel, databaseResponse.rows);
  }
}
