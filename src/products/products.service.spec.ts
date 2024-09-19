import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('adds and retrieves products to the store', () => {
    const newProduct = {
      name: 'new product',
      description: 'new description',
      price: 11.99,
      stockLevel: 1,
    };

    service.addProduct(newProduct);

    expect(service.findAll()).toEqual([newProduct]);
  });
});
