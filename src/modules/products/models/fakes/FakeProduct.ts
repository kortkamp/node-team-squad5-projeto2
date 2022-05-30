import { faker } from '@faker-js/faker';
import { FakeProductOrder } from '@modules/orders/models/fakes/FakeProductOrder';
import { IProductOrder } from '@modules/orders/models/IProductOrder';
import Ean from 'ean-generator';

import { IEntry } from '../IEntry';
import { IProduct } from '../IProduct';
import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { FakeEntry } from './FakeEntry';

class FakeProduct implements IProduct {
  id: string;
  name: string;
  description: string;
  value: number;
  code: string;
  quantity: number;
  category: string;
  created_at: Date;
  updated_at: Date;

  constructor(data?: Partial<ICreateProductDTO>) {
    this.id = faker.datatype.uuid();
    this.name = faker.commerce.productName();
    this.description = faker.commerce.productDescription();
    this.value = parseFloat(faker.commerce.price());
    this.code = new Ean(['030', '031', '039']).create();
    this.quantity = Math.floor(Math.random() * 100);
    this.category = faker.commerce.department();
    this.created_at = new Date();
    this.updated_at = new Date();

    Object.assign(this, data);
  }
}

export { FakeProduct };
