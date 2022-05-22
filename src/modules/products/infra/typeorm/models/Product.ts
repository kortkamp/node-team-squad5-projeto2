import { ProductOrder } from '@modules/orders/infra/typeorm/models/ProductOrder';
import { IProduct } from '@modules/products/models/IProduct';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Entry } from './Entry';

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('integer')
  value: number;

  @Column('varchar')
  code: string;

  @Column('integer')
  quantity: number;

  @Column('varchar')
  category: string;

  @OneToMany(type => ProductOrder, product_order => product_order.product, {})
  @JoinColumn({ name: 'id' })
  orders: ProductOrder[];

  @OneToMany(type => Entry, entry => entry.product, {})
  @JoinColumn({ name: 'id' })
  entries: Entry[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Product };
