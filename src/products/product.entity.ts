import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  Unique,
} from 'sequelize-typescript';

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
}
