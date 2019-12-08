import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiUseTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './customer.entity';
import { QueryCustomerDto } from './dto/query-customer.dto';

@ApiUseTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getAllCustomers(@Query() query: QueryCustomerDto) {
    return await this.customersService.getAllCustomers(query);
  }

  @ApiCreatedResponse({ type: CreateCustomerDto })
  @Post()
  async createCustomer(@Body() body: CreateCustomerDto) {
    return await this.customersService.createCustomer(
      body.name,
      body.cpf,
      body.email,
    );
  }
}
