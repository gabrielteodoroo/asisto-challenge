import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-repository.interface';
import { Either, left, right } from 'src/errors/either/either';
import { NotAllowedError } from 'src/errors/custom-errors/not-allowed-error';
import { InvalidEmailError } from 'src/errors/custom-errors/invalid-email-error';
import { User } from './entities/User';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'src/errors/custom-errors/not-found-error';
import { InvalidCredentialsError } from 'src/errors/custom-errors/invalid-credentials-error';
import { JwtService } from '@nestjs/jwt';

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
}

type CreateUserResponse = Either<NotAllowedError, User>

type UpdateUserRequest = {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UpdateUserResponse = Either<NotAllowedError | InvalidEmailError, User>

type ListUsersResponse = Either<null, User[]>;

type GetUserByIdResponse = Either<NotFoundError, User>

type AuthenticateUserRequest = {
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

  async create({ email, name, password }: CreateUserRequest): Promise<CreateUserResponse> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      return left(new NotAllowedError())
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      name,
      password: hashedPassword
    });

    await this.userRepository.createUser(user);

    return right(user);
  }

  async findMany(): Promise<ListUsersResponse> {
    const users = await this.userRepository.findMany();

    return right(users);
  }

  async update({ email, id, name, password }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotAllowedError())
    }

    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists && emailExists.id !== id) {
      return left(new InvalidEmailError())
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.email = email;
    user.name = name;
    user.password = hashedPassword;
    user.updatedAt = new Date();

    await this.userRepository.save(user);

    return right(user);
  }

  async findById(id: string): Promise<GetUserByIdResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotFoundError())
    }

    return right(user);
  }

  async authenticate({ email, password }: AuthenticateUserRequest): Promise<Either<InvalidCredentialsError | NotAllowedError, { user: User; token: string }>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return left(new InvalidCredentialsError())
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
    })

    return right({
      user,
      token
    });

  }
}
