import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from './customer.entity';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerDto } from './dto/customer.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  async getAllCustomers(query: QueryCustomerDto): Promise<Customer[]> {
    const { limit, offset, order, orderby } = query;
    const columnOrderBy = orderby ? orderby : 'id';

    return await Customer.findAll<Customer>({
      where: query.getFieldsToLike(),
      limit,
      offset,
      order: [[columnOrderBy, order]],
    });
  }

  async createCustomer(customerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer(customerDto);

    return await customer.save();
  }

  async updateCustomer(body: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findCustomerById(body.id);

    customer.name = body.name;
    customer.email = body.email;

    return await customer.save();
  }

  async deleteCustomer(id: number): Promise<Customer> {
    const customer = await this.findCustomerById(id);

    return await customer.destroy();
  }

  async findCustomerById(id: number): Promise<Customer> {
    const customer = await Customer.findOne({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado!');
    }
    return customer;
  }
}
