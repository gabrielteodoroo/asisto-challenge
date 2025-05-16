import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ProductRepository } from "src/product/repository/product-repository.interface";
import { Product } from "src/product/entities/Product";


@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(product: Product): Promise<Product> {
    const newProduct = await this.prismaService.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        customerId: product.customerId
      }
    })

    return new Product({
      name: newProduct.name,
      description: newProduct.description || undefined,
      customerId: newProduct.customerId
    }, newProduct.id);

  }
  async findById(data: { id: string; customerId: string; }): Promise<Product | null> {
    const product = await this.prismaService.product.findFirst({
      where: {
        id: data.id,
        customerId: data.customerId
      }
    })

    if (!product) {
      return null;
    }

    return new Product({
      name: product.name,
      description: product.description || undefined,
      customerId: product.customerId
    }, product.id);
  }

  findManyByCustomerId(customerId: string): Promise<Product[]> {
    return this.prismaService.product.findMany({
      where: {
        customerId
      }
    }).then((products) => {
      return products.map((product) => new Product({
        name: product.name,
        description: product.description || undefined,
        customerId: product.customerId
      }, product.id));
    })
  }

  async findByName(data: { name: string; customerId: string; }): Promise<Product | null> {
    const product = await this.prismaService.product.findFirst({
      where: {
        name: data.name,
        customerId: data.customerId
      }
    })

    if (!product) {
      return null;
    }

    return new Product({
      name: product.name,
      description: product.description || undefined,
      customerId: product.customerId
    }, product.id);
  }
}