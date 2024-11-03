import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { ProductDto } from './dto/product.dto';
import { PostgresError } from 'pg-error-enum';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async addProduct(data: ProductDto) {
    try {
      const request = await this.productRepository.addProduct(data);
      return request;
    } catch (e) {
      if (e?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getProducts() {
    try {
      const request = await this.productRepository.getProducts();
      return request;
    } catch (e) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchProducts(query: string) {
    try {
      const request = await this.productRepository.querySearch(query);
      return request;
    } catch (e) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
