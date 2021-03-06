import { IProductOrder } from '@modules/orders/models/IProductOrder';
import { IEntry } from './IEntry';

interface IProduct {
  id: string;
  name: string;
  description: string;
  value: number;
  code: string;
  quantity: number;
  orders: IProductOrder[];
  entries: IEntry[];
  category: string;
  created_at: Date;
  updated_at: Date;
}

export { IProduct };
