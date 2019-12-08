import { Sequelize } from 'sequelize-typescript';
import * as databaseConfig from '../../db/config';
import { Customer } from '../customers/customer.entity';
import { Product } from '../products/product.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([Customer, Product]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
