import { injectable, inject } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IProduct } from '../models/IProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IResumedProduct extends IProduct {
  sales: number;
  sales_value: number;
  total_entries: number;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(filters: IFilterQuery) {
    const [products, length] = await this.productsRepository.getAll(filters);

    const total = await this.productsRepository.getTotal();

    products.forEach(product => {
      const totalSales = product.orders.reduce(
        (total, order) => total + order.quantity,
        0,
      );
      const totalSalesValue = product.orders.reduce(
        (total, order) => total + order.quantity * product.value,
        0,
      );
      const totalEntries = product.entries.reduce(
        (total, entry) => total + entry.quantity,
        0,
      );

      Object.assign(product, {
        sales: totalSales,
        sales_value: totalSalesValue,
        total_entries: totalEntries,
      });
    });

    const resume = {
      // Total de produtos que já foi cadastrado
      entries: products.reduce(
        (total, product) => total + (product as IResumedProduct).total_entries,
        0,
      ),
      // Total de produtos em estoque
      stock: products.reduce((total, product) => total + product.quantity, 0),
      // Valor total do estoque atual
      stock_value: products.reduce(
        (total, product) => total + product.quantity * product.value,
        0,
      ),
      // Total de produtos que já saiu do estoque
      sales: products.reduce(
        (total, product) => total + (product as IResumedProduct).sales,
        0,
      ),
      // Valor já faturado
      sales_value: products.reduce(
        (total, product) => total + (product as IResumedProduct).sales_value,
        0,
      ),
    };

    return {
      result: products,
      resume,
      total_registers: total,
      total_filtered: length,
      page: filters.page,
      per_page: filters.per_page,
      total_pages: Math.ceil(length / filters.per_page),
    };
  }
}

export { ListProductsService };
