import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPresenter } from 'src/presenters/user-presenter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateUserDto) {
    const { email, name, password } = body

    const response = await this.userService.create({
      email, name, password
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    return UserPresenter.toHTTP(response.value)
  }

  @Get()
  async findMany() {
    const response = await this.userService.findMany();

    if (response.isLeft() || !response.value) {
      return [];
    }

    return response.value.map(UserPresenter.toHTTP);
  }
}
