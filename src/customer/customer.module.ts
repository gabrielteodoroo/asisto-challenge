import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './repositories/customer-repository.interface';
import { UserRepository } from 'src/user/repository/user-repository.interface';

@Module({
  imports: [DatabaseModule, CustomerModule],
  controllers: [CustomerController],
  providers: [{
    provide: CustomerService,
    useFactory: (customerRepository: CustomerRepository, userRepository: UserRepository) => {
      return new CustomerService(customerRepository, userRepository)
    },
    inject: [CustomerRepository, UserRepository],
  }],
})
export class CustomerModule { }
