import { IOrder, OrderStatus } from '@modules/orders/models/IOrder';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { ProductOrder } from './ProductOrder';

@Entity('orders')
class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column('varchar')
  status: OrderStatus;

  @OneToMany(type => ProductOrder, product_order => product_order.order, {})
  @JoinColumn({ name: 'id' })
  products: ProductOrder[];

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

export { Order };
