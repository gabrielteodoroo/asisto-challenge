import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer-repository.interface';
import { Customer } from './entities/Customer';
import { Either, left, right } from 'src/errors/either/either';
import { NotAllowedError } from 'src/errors/custom-errors/not-allowed-error';
import { UserRepository } from 'src/user/repository/user-repository.interface';
import { InvalidEmailError } from 'src/errors/custom-errors/invalid-email-error';

type CreateCustomerRequest = {
  name: string;
  email: string;
  userId: string;
}

type CreateCustomerResponse = Either<NotAllowedError, Customer>

type ListCustomersResponse = Either<null, Customer[]>;

type UpdateCustomerRequest = {
  id: string;
  name: string;
  email: string;
  userId: string;
}

type UpdateCustomerResponse = Either<NotAllowedError | InvalidEmailError, Customer>
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

  async findById({ id, userId }: { id: string; userId: string }): Promise<Either<NotAllowedError, Customer>> {
    const customer = await this.customerRepository.findById({ id, userId });

    if (!customer) {
      return left(new NotAllowedError());
    }

    return right(customer);
  }

  async findMany(userId: string): Promise<ListCustomersResponse> {
    const customers = await this.customerRepository.findMany(userId);

    return right(customers);
  }

  async update({ email, id, name, userId }: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    const customer = await this.customerRepository.findById({ id, userId });

    if (!customer) {
      return left(new NotAllowedError());
    }

    const emailExists = await this.customerRepository.findByEmail(email);
    if (emailExists && emailExists.id !== id) {
      return left(new NotAllowedError());
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return right(customer);
  }
}
