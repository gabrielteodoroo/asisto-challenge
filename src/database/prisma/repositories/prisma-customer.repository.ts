import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/User";
import { PrismaService } from "../prisma.service";
import { CustomerRepository } from "src/customer/repositories/customer-repository.interface";
import { Customer } from "src/customer/entities/Customer";


@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async createCustomer(customer: Customer): Promise<Customer> {
    const newCustomer = await this.prismaService.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        userId: customer.user.id
      }
    })

    return new Customer({
      email: customer.email,
      name: customer.name,
      user: new User({
        email: customer.user.email,
        name: customer.user.name,
        password: customer.user.password
      }, newCustomer.id)
    })
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { email },
      include: {
        user: true
      }
    })

    if (!customer) {
      return null;
    }

    return new Customer({
      name: customer.name,
      email: customer.email,
      user: new User({
        name: customer.user.name,
        email: customer.user.email,
        password: customer.user.password
      }, customer.user.id)
    }, customer.id);
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { id },
      include: {
        user: true
      }
    })

    if (!customer) {
      return null;
    }

    return new Customer({
      name: customer.name,
      email: customer.email,
      user: new User({
        name: customer.user.name,
        email: customer.user.email,
        password: customer.user.password
      }, customer.user.id)
    }, customer.id);
  }

  async save(customer: Customer): Promise<void> {
    await this.prismaService.customer.update({
      where: { id: customer.id },
      data: {
        name: customer.name,
        email: customer.email,
        userId: customer.user.id
      }
    })
  }

  findMany(userId: string): Promise<Customer[]> {
    return this.prismaService.customer.findMany({
      where: { userId },
      include: {
        user: true
      }
    }).then(customers => {
      return customers.map(customer => {
        return new Customer({
          name: customer.name,
          email: customer.email,
          user: new User({
            name: customer.user.name,
            email: customer.user.email,
            password: customer.user.password
          }, customer.user.id)
        }, customer.id);
      })
    }
    )
  }

}