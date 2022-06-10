import 'reflect-metadata';

import { FakeProduct } from '../models/fakes/FakeProduct';
import { FakeEntriesRepository } from '../repositories/fakes/FakeEntriesRepository';
import { FakeProductsRepository } from '../repositories/fakes/FakeProductsRepository';
import { CreateProductService } from './CreateProductService';

let fakeEntriesRepository: FakeEntriesRepository;
let fakeProductsRepository: FakeProductsRepository;
let createProductService: CreateProductService;
let fakeProduct: FakeProduct;

describe('CreateProductService', () => {
  beforeAll(() => {
    fakeEntriesRepository = new FakeEntriesRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeProduct = new FakeProduct();
    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeEntriesRepository,
    );
  });

  it('Should be able to input a new product.', async () => {
    const productCreated = await createProductService.execute(fakeProduct);
    expect(productCreated).toHaveProperty('id');
    expect(productCreated?.name).toBe(fakeProduct.name);
  });

  it('Increase quantity stock of an existent', async () => {
    const productCreated = await createProductService.execute(fakeProduct);
    const previousQuantity = fakeProduct.quantity;
    expect(productCreated.quantity).toBeGreaterThan(previousQuantity);
  });

  it('The product exists but does not match the name.', async () => {
    fakeProduct.name = 'Sky Gloves S/A';
    await expect(
      createProductService.execute(fakeProduct),
    ).rejects.toMatchObject({
      message: 'The product already exists, but the names do not match',
    });
  });
});
