import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, NotFoundException, Put, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPresenter } from 'src/presenters/user-presenter';
import { Public } from 'src/auth/public';
import { NotFoundError } from 'src/errors/custom-errors/not-found-error';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggedUser, UserPayload } from 'src/auth/logged-user';
import { LoginDTO } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  @Public()
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

  @Get(':id')
  async get(@Param('id') id: string) {
    const response = await this.userService.findById(id);

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message)
    }

    return UserPresenter.toHTTP(response.value);
  }

  @Put()
  @HttpCode(204)
  async update(@LoggedUser() user: UserPayload, @Body() body: UpdateUserDto) {
    const { email, name, password } = body

    const response = await this.userService.update({
      id: user.id,
      email,
      name,
      password
    })

    if (response.isLeft()) {
      if (response.value.cause instanceof NotFoundError) {
        throw new NotFoundException(response.value.message)
      }
      throw new BadRequestException(response.value.message)
    }

    return UserPresenter.toHTTP(response.value)
  }

  @Post('/login')
  @HttpCode(200)
  @Public()
  async login(@Body() body: LoginDTO) {
    const { email, password } = body

    const response = await this.userService.authenticate({
      email, password
    })

    if (response.isLeft()) {
      throw new UnauthorizedException(response.value.message)
    }

    const { user, token } = response.value

    return {
      token,
      user: UserPresenter.toHTTP(user)
    }
  }
}
