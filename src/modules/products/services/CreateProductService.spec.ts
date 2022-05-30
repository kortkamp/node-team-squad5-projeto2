import 'reflect-metadata';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { FakeProduct } from '../models/fakes/FakeProduct';
import { FakeEntriesRepository } from '../repositories/fakes/FakeEntriesRepository';
import { FakeProductsRepository } from '../repositories/fakes/FakeProductsRepository';
import { CreateProductService } from './CreateProductService';

let fakeEntriesRepository: FakeEntriesRepository;
let fakeProductsRepository: FakeProductsRepository;
let createProductService: CreateProductService;
const fakeProduct: ICreateProductDTO = new FakeProduct();

describe('Product -> CRUD', () => {
  beforeEach(() => {
    fakeEntriesRepository = new FakeEntriesRepository();
    fakeProductsRepository = new FakeProductsRepository();
    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeEntriesRepository,
    );
  });

  it('Should be able to input a new product.', async () => {
    const insertProduct = await createProductService.execute(fakeProduct);

    expect(insertProduct).toHaveProperty('id');
    expect(insertProduct?.name).toBe(fakeProduct.name);
  });
});
