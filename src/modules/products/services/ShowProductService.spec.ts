import 'reflect-metadata';

import { faker } from '@faker-js/faker';
import { FakeProduct } from '../models/fakes/FakeProduct';
import { FakeProductsRepository } from '../repositories/fakes/FakeProductsRepository';
import { CreateProductService } from './CreateProductService';
import { ShowProductService } from './ShowProductService';
import { FakeEntriesRepository } from '../repositories/fakes/FakeEntriesRepository';

let fakeProductsRepository: FakeProductsRepository;
let fakeEntriesRepository: FakeEntriesRepository;
let showProductService: ShowProductService;
let createProductService: CreateProductService;
let fakeProduct: FakeProduct;

let fakeProductInserted: FakeProduct;

describe('ShowProductService', () => {
  beforeAll(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeEntriesRepository = new FakeEntriesRepository();
    fakeProduct = new FakeProduct();
    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeEntriesRepository,
    );
    fakeProductInserted = await createProductService.execute(fakeProduct);
    showProductService = new ShowProductService(fakeProductsRepository);
  });
  it('Show a specific product', async () => {
    const productWanted = await showProductService.execute(
      fakeProductInserted.id,
    );
    expect(productWanted.id).toBe(fakeProductInserted.id);
  });
  it('Test if the desired product cannot be shown', async () => {
    const productId = faker.datatype.uuid();
    await expect(showProductService.execute(productId)).rejects.toMatchObject({
      message: 'Product not found',
    });
  });
});
