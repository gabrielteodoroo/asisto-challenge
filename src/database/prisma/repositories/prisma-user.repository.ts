import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/User";
import { UserRepository } from "src/user/repository/user-repository.interface";
import { PrismaService } from "../prisma.service";


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async createUser(user: User): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    return new User({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    }, newUser.id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { email }
    })

    if (!user) {
      return null;
    }

    return new User({
      name: user.name,
      email: user.email,
      password: user.password,
    }, user.id);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id }
    });

    if (!user) {
      return null;
    }

    return new User({
      name: user.name,
      email: user.email,
      password: user.password,
    }, user.id);
  }

  async save(user: User): Promise<void> {
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    })
  }

  findMany(): Promise<User[]> {
    return this.prismaService.user.findMany().then(users => {
      return users.map(user => new User({
        name: user.name,
        email: user.email,
        password: user.password,
      }, user.id));
    });
  }
}