import { v4 as uuid } from 'uuid';

import { IEntry } from '../IEntry';
import { ICreateEntryDTO } from '../../dtos/ICreateEntryDTO';

class FakeEntry implements IEntry {
  id: string;
  product_id: string;
  quantity: number;
  created_at: Date;

  constructor(data?: ICreateEntryDTO) {
    this.id = uuid();
    this.product_id = uuid();
    this.quantity = 4;
    this.created_at = new Date();

    Object.assign(this, data);
  }
}

export { FakeEntry };
