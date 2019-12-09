import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { Order } from 'src/orders/order.entity';

@Table({ tableName: 'customers', timestamps: true })
export class Customer extends Model<Customer> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Unique
  @Column
  cpf: string;

  @Column
  email: string;

  @HasMany(() => Order)
  orders: Order[];
}
