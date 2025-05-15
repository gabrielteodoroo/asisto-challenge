import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoggedUser, UserPayload } from 'src/auth/logged-user';
import { CustomerPresenter } from 'src/presenters/customer-presenter';

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
}
