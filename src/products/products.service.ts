import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  async getAllProducts(query: QueryProductDto): Promise<Product[]> {
    const { limit, offset, order, orderby } = query;
    const columnOrderBy = orderby ? orderby : 'id';

    return await Product.findAll<Product>({
      where: query.getFieldsToLike(),
      limit,
      offset,
      order: [[columnOrderBy, order]],
    });
  }

  async createProduct(productDto: CreateProductDto): Promise<Product> {
    const product = new Product(productDto);

    return await product.save();
  }

  async updateProduct(body: UpdateProductDto): Promise<Product> {
    const product = await this.findProductById(body.id);

    product.name = body.name;
    product.barcode = body.barcode;
    product.unitPrice = body.unitPrice;

    return await product.save();
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.findProductById(id);

    return await product.destroy();
  }

  async findProductById(id: number): Promise<Product> {
    const product = await Product.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado!');
    }
    return product;
  }

  async findProductsByIds(ids: number[]) {
    const products = await Product.findAll({
      where: {
        id: ids,
      },
    });

    return products;
  }
}
