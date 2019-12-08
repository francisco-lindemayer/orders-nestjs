import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiUseTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { CustomerDto } from './dto/customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiUseTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOkResponse({ type: CustomerDto, isArray: true })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getAllCustomers(@Query() query: QueryCustomerDto) {
    const customers = await this.customersService.getAllCustomers(query);

    return customers.map(customer => new CustomerDto(customer));
  }

  @ApiOkResponse({ type: CustomerDto })
  @Get(':id')
  async getCustomer(@Param('id') id: number) {
    const customer = await this.customersService.findCustomerById(id);

    return new CustomerDto(customer);
  }

  @ApiCreatedResponse({ type: CustomerDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createCustomer(@Body() body: CreateCustomerDto) {
    const customer = await this.customersService.createCustomer(body);

    return new CustomerDto(customer);
  }

  @ApiOkResponse({ type: CustomerDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put()
  async updateCustomer(@Body() body: UpdateCustomerDto) {
    const customer = await this.customersService.updateCustomer(body);

    return new CustomerDto(customer);
  }

  @ApiOkResponse({ type: CustomerDto })
  @Delete(':id')
  async deleteCustomer(@Param('id') id: number) {
    const customer = await this.customersService.deleteCustomer(id);

    return new CustomerDto(customer);
  }
}
