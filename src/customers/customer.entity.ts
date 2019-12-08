import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  Unique,
} from 'sequelize-typescript';

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
}
