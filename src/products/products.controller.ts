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
import { ProductsService } from './products.service';
import { ApiUseTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiUseTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({ type: ProductDto, isArray: true })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getAllProducts(@Query() query: QueryProductDto) {
    const products = await this.productsService.getAllProducts(query);

    return products.map(product => new ProductDto(product));
  }

  @ApiOkResponse({ type: ProductDto })
  @Get(':id')
  async getProduct(@Param('id') id: number) {
    const product = await this.productsService.findProductById(id);

    return new ProductDto(product);
  }

  @ApiCreatedResponse({ type: ProductDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const product = await this.productsService.createProduct(body);

    return new ProductDto(product);
  }

  @ApiOkResponse({ type: ProductDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put()
  async updateProduct(@Body() body: UpdateProductDto) {
    const product = await this.productsService.updateProduct(body);

    return new ProductDto(product);
  }

  @ApiOkResponse({ type: ProductDto })
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    const product = await this.productsService.deleteProduct(id);

    return new ProductDto(product);
  }
}
