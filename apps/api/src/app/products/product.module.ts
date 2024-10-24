import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [],
  providers: [ProductRepository, ProductService],
  controllers: [ProductController],
})
export class ProductModuel {}
