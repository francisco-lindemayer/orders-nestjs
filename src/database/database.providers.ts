import { Sequelize } from 'sequelize-typescript';
import * as databaseConfig from '../../db/config';
import { Customer } from '../customers/customer.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([Customer]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
