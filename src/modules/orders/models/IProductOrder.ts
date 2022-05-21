import { IProduct } from '@modules/products/models/IProduct';

interface IProductOrder {
  id: string;

  order_id: string;

  product_id: string;

  product: IProduct;

  quantity: number;
}

export { IProductOrder };
