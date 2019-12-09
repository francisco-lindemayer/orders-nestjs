import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';

@Table({ tableName: 'order_itens', timestamps: true })
export class OrderItem extends Model<OrderItem> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column
  quantity: number;

  @Column
  unitPrice: number;

  @Column
  totalPrice: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;

  totalize(unitPrice: number, quantity?: number) {
    if (quantity) {
      this.quantity = quantity;
    }
    this.unitPrice = unitPrice;

    this.totalPrice = this.quantity * this.unitPrice;
  }
}
