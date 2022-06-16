import 'reflect-metadata';

import { parseQueryFilters } from 'typeorm-dynamic-filters';
import { FakeProduct } from '@modules/products/models/fakes/FakeProduct';
import { FakeProductsRepository } from '@modules/products/repositories/fakes/FakeProductsRepository';
import { ListProductsService } from '@modules/products/services/ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let listProducts: ListProductsService;

describe('ListProductsService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    listProducts = new ListProductsService(fakeProductsRepository);
  });

  it('Should be able to list products', async () => {
    const Product1 = await fakeProductsRepository.create(new FakeProduct());

    const Product2 = await fakeProductsRepository.create(new FakeProduct());

    const { result } = await listProducts.execute(parseQueryFilters({}));

    expect(result).toEqual([Product1, Product2]);
  });
});
