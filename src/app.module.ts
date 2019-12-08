import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CustomersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
