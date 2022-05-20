import { CreateOrderService } from '@modules/orders/services/CreateOrderService';
import { ListOrdersService } from '@modules/orders/services/ListOrdersService';
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

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const showProduct = container.resolve(ShowProductService);

  //   const productId = request.params.id;

  //   const user = await showProduct.execute(productId);

  //   return response.json({ success: true, user });
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrderService = container.resolve(CreateOrderService);

    const user_id = request.user.id;

    const order = await createOrderService.execute({ user_id });

    return response.status(201).json({ success: true, order });
  }
}

export { OrdersController };
