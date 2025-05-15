import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UserRepository } from "src/user/repository/user-repository.interface";
import { PrismaUserRepository } from "./repositories/prisma-user.repository";
import { CustomerRepository } from "src/customer/repositories/customer-repository.interface";
import { PrismaCustomerRepository } from "./repositories/prisma-customer.repository";

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: CustomerRepository, useClass: PrismaCustomerRepository },
  ],
  exports: [PrismaService, UserRepository, CustomerRepository],
})
export class PrismaModule { }