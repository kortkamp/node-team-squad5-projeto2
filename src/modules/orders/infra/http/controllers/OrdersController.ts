import { CreateOrderService } from '@modules/orders/services/CreateOrderService';
import { DeleteOrderService } from '@modules/orders/services/DeleteOrderService';
import { ListOrdersService } from '@modules/orders/services/ListOrdersService';
import { ShowOrderService } from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrdersService = container.resolve(ListOrdersService);

    const filters = parseQueryFilters(request.query);
    const orders = await listOrdersService.execute(filters);

    return response.json({ success: true, ...orders });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showOrderService = container.resolve(ShowOrderService);

    const orderId = request.params.id;

    const order = await showOrderService.execute(orderId);

    return response.json({ success: true, order });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteOrderService = container.resolve(DeleteOrderService);

    const orderId = request.params.id;

    await deleteOrderService.execute(orderId);

    return response.status(204).send();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrderService = container.resolve(CreateOrderService);

    const user_id = request.user.id;

    const order = await createOrderService.execute({ user_id });

    return response.status(201).json({ success: true, order });
  }
}

export { OrdersController };
