import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UserRepository } from "src/user/repository/user-repository.interface";
import { PrismaUserRepository } from "./repositories/prisma-user.repository";
import { CustomerRepository } from "src/customer/repositories/customer-repository.interface";
import { PrismaCustomerRepository } from "./repositories/prisma-customer.repository";
import { ProductRepository } from "src/product/repository/product-repository.interface";
import { PrismaProductRepository } from "./repositories/prisma-product.repository";

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: CustomerRepository, useClass: PrismaCustomerRepository },
    { provide: ProductRepository, useClass: PrismaProductRepository },
  ],
  exports: [PrismaService, UserRepository, CustomerRepository, ProductRepository],
})
export class PrismaModule { }