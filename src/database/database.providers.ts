import { Sequelize } from 'sequelize-typescript';
import * as databaseConfig from '../../db/config';
import { Customer } from '../customers/customer.entity';
import { Product } from '../products/product.entity';
import { Order } from 'src/orders/order.entity';
import { OrderItem } from 'src/orders/order-item.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([Customer, Product, Order, OrderItem]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
