export enum OrderStatus {
  OPEN = 'open',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
}

interface IOrder {
  id: string;

  user_id: string;

  status: OrderStatus;

  created_at: Date;

  updated_at: Date;
}

export { IOrder };
