import { IProductOrder } from '@modules/orders/models/IProductOrder';
import { Product } from '@modules/products/infra/typeorm/models/Product';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Order } from './Order';

@Entity('products_order')
class ProductOrder implements IProductOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @ManyToOne(() => Order, order => order)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @Column()
  quantity: number;

  @Column('uuid')
  product_id: string;

  @ManyToOne(() => Product, product => product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ProductOrder };
