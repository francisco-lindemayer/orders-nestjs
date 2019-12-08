import { Injectable, Inject } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersModule } from './customers.module';
import { QueryCustomerDto } from './dto/query-customer.dto';

@Injectable()
export class CustomersService {
  async getAllCustomers(query: QueryCustomerDto) {
    const { limit, offset, order, orderby } = query;
    const columnOrderBy = orderby ? orderby : 'id';

    return await Customer.findAll<Customer>({
      where: query.getFieldsToLike(),
      limit,
      offset,
      order: [[columnOrderBy, order]],
      logging: true,
    });
  }

  async createCustomer(name: string, cpf: string, email: string) {
    const customer = new Customer({ name, cpf, email });

    return await customer.save();
  }
}
