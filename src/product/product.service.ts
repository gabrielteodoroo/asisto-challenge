import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./repository/product-repository.interface";
import { Product } from "./entities/Product";
import { CustomerRepository } from "src/customer/repositories/customer-repository.interface";
import { Either, left, right } from "src/errors/either/either";
import { NotFoundError } from "src/errors/custom-errors/not-found-error";
import { NotAllowedError } from "src/errors/custom-errors/not-allowed-error";
import { ConflictError } from "src/errors/custom-errors/conflict-error";

type FindManyByCustomerId = {
  customerId: string;
  userId: string;
}

type findManyByCustomerIdResponse = Either<NotFoundError, Product[]>

type CreateProductRequest = {
  userId: string;
  name: string;
  description?: string;
  customerId: string;
}

type CreateProductResponse = Either<NotFoundError | NotAllowedError | ConflictError, Product>

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository, private customerRepository: CustomerRepository) { }

  async create({ customerId, name, description, userId }: CreateProductRequest): Promise<CreateProductResponse> {
    const customer = await this.customerRepository.findById({ id: customerId, userId });
    console.log(customer)
    if (!customer) {
      return left(new NotFoundError())
    }

    const productExists = await this.productRepository.findByName({ name, customerId });
    if (productExists) {
      return left(new ConflictError('Product already exists'))
    }

    const product = new Product({
      name,
      description,
      customerId: customer.id
    });

    await this.productRepository.create(product);

    return right(product);
  }

  async findManyByCustomerId({ customerId, userId }: FindManyByCustomerId): Promise<findManyByCustomerIdResponse> {
    const customer = await this.customerRepository.findById({ id: customerId, userId });
    if (!customer) {
      return left(new NotFoundError())
    }

    const products = await this.productRepository.findManyByCustomerId(customerId);

    return right(products);
  }
}
