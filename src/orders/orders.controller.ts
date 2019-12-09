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
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiUseTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiUseTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOkResponse({ type: OrderDto, isArray: true })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getAllOrders(@Query() query: QueryOrderDto) {
    const orders = await this.ordersService.getAllOrders(query);

    return orders.map(order => new OrderDto(order));
  }

  @ApiOkResponse({ type: OrderDto })
  @Get(':id')
  async getOrder(@Param('id') id: number) {
    const order = await this.ordersService.findOrderById(id);

    return new OrderDto(order);
  }

  @ApiCreatedResponse({ type: OrderDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    const order = await this.ordersService.createOrder(body);

    return new OrderDto(order);
  }

  @ApiOkResponse({ type: OrderDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch()
  async updateOrder(@Body() body: UpdateOrderDto) {
    const order = await this.ordersService.updateOrder(body);

    return new OrderDto(order);
  }

  @ApiOkResponse({ type: OrderDto })
  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    const order = await this.ordersService.deleteOrder(id);

    return new OrderDto(order);
  }
}
