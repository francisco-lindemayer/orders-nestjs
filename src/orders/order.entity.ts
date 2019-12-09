import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Customer } from 'src/customers/customer.entity';
import { OrderItem } from './order-item.entity';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Customer)
  @Column
  customerId: number;

  @Column
  totalPrice: number;

  @Column
  status: 'pending' | 'paid' | 'canceled';

  @BelongsTo(() => Customer)
  customer: Customer;

  @HasMany(() => OrderItem)
  orderItens: OrderItem[];
}
