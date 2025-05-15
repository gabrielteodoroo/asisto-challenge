import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer-repository.interface';
import { Customer } from './entities/Customer';
import { Either, left, right } from 'src/errors/either/either';
import { NotAllowedError } from 'src/errors/custom-errors/not-allowed-error';
import { UserRepository } from 'src/user/repository/user-repository.interface';

type CreateCustomerRequest = {
  name: string;
  email: string;
  userId: string;
}

type CreateCustomerResponse = Either<NotAllowedError, Customer>

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository, private userRepository: UserRepository) { }

  async create({ email, name, userId }: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      return left(new NotAllowedError());
    }

    const emailExists = await this.customerRepository.findByEmail(email);
    if (emailExists && emailExists.user.id === userId) {
      return left(new NotAllowedError());
    }

    const customer = new Customer({
      email,
      name,
      user: userExists,
    });

    await this.customerRepository.createCustomer(customer);

    return right(customer);
  }
}
