import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  Unique,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { OrderItem } from 'src/orders/order-item.entity';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model<Product> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Unique
  @Column
  barcode: string;

  @Column
  unitPrice: number;

  @HasMany(() => OrderItem)
  orderItens: OrderItem[];
}
