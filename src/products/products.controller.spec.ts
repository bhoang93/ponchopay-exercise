import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    productsService = new ProductsService();
    productsController = new ProductsController(productsService);
  });

  it('should return all products', () => {
    const allProducts = [
      {
        name: 'new product',
        description: 'test',
        price: 11.99,
        stockLevel: 0,
      },
    ];

    jest
      .spyOn(productsService, 'findAll')
      .mockImplementation(() => allProducts);

    expect(productsController.getAllProducts()).toStrictEqual(allProducts);
  });
});
