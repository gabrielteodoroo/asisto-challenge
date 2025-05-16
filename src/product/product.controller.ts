import { Controller, Post, Body, Param, HttpCode, BadRequestException, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { LoggedUser, UserPayload } from 'src/auth/logged-user';
import { ProductPresenter } from 'src/presenters/product-presenter';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post(':id')
  @HttpCode(201)
  async create(@Param('id') id: string, @Body() body: CreateProductDto, @LoggedUser() user: UserPayload) {
    const { name, description } = body

    const response = await this.productService.create({
      customerId: id,
      name,
      description,
      userId: user.id,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    return ProductPresenter.toHTTP(response.value)
  }

  @Get(':id')
  async findManyByCustomerId(@Param('id') id: string, @LoggedUser() user: UserPayload) {
    const response = await this.productService.findManyByCustomerId({
      customerId: id,
      userId: user.id
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    return response.value.map((product) => ProductPresenter.toHTTP(product))
  }
}
