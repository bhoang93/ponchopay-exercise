import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../interfaces/product.interface';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.findAll();
  }
}
