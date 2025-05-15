import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/User";
import { UserRepository } from "src/user/repository/user-repository.interface";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  createrUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}