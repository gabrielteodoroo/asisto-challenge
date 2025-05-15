import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoggedUser, UserPayload } from 'src/auth/logged-user';
import { CustomerPresenter } from 'src/presenters/customer-presenter';
import { NotFoundError } from 'src/errors/custom-errors/not-found-error';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateCustomerDto, @LoggedUser() user: UserPayload) {
    const { email, name } = body

    const response = await this.customerService.create({
      email, name, userId: user.id
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    return CustomerPresenter.toHTTP(response.value)
  }

  @Get()
  async findMany(@LoggedUser() user: UserPayload) {
    const response = await this.customerService.findMany(user.id);

    if (response.isLeft() || !response.value) {
      return [];
    }

    return response.value.map(CustomerPresenter.toHTTP);
  }

  @Get(':id')
  async get(@LoggedUser() user: UserPayload, @Param('id') id: string) {
    const response = await this.customerService.findById({ id, userId: user.id });

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message)
    }

    return CustomerPresenter.toHTTP(response.value);
  }

  @Put(':id')
  @HttpCode(204)
  async update(@LoggedUser() user: UserPayload, @Param('id') id: string, @Body() body: UpdateCustomerDto) {
    const { email, name } = body

    const response = await this.customerService.update({
      id,
      email,
      name,
      userId: user.id
    })

    if (response.isLeft()) {
      if (response.value.cause instanceof NotFoundError) {
        throw new NotFoundException(response.value.message)
      }
      throw new BadRequestException(response.value.message)
    }

    return CustomerPresenter.toHTTP(response.value);
  }

}
