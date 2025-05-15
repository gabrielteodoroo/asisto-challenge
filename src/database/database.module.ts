import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "src/user/repository/user-repository.interface";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [UserRepository]
})
export class DatabaseModule { }