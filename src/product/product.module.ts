import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repository/product-repository.interface';
import { CustomerRepository } from 'src/customer/repositories/customer-repository.interface';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [ProductController],
  providers: [{
    provide: ProductService,
    useFactory: (productRepository: ProductRepository, customerRepository: CustomerRepository) => {
      return new ProductService(productRepository, customerRepository)
    },
    inject: [ProductRepository, CustomerRepository],
  }],
})
export class ProductModule { }
