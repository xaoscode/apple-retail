import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async newProduct(@Body() dto: ProductDto) {
    this.productService.addProduct(dto);
  }
  @Get('get-products')
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get('search')
  async searchProducts(@Query('q') query: string) {
    console.log('search');
    return this.productService.searchProducts(query);
  }
}
