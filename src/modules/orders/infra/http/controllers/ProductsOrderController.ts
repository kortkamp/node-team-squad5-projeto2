import { AddProductService } from '@modules/orders/services/AddProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProductsOrderController {
  // public async show(request: Request, response: Response): Promise<Response> {
  //   const showProduct = container.resolve(ShowProductService);

  //   const productId = request.params.id;

  //   const user = await showProduct.execute(productId);

  //   return response.json({ success: true, user });
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const addProductService = container.resolve(AddProductService);

    const productOrder = await addProductService.execute(request.body);

    return response.status(201).json({ success: true, productOrder });
  }
}

export { ProductsOrderController };
