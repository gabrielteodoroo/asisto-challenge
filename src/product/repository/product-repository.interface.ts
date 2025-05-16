import { Product } from "../entities/Product";

type TFindById = {
  id: string;
  customerId: string
}

type TFindByName = {
  name: string;
  customerId: string
}

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findById(data: TFindById): Promise<Product | null>;
  abstract findManyByCustomerId(customerId: string): Promise<Product[]>;
  abstract findByName(data: TFindByName): Promise<Product | null>;
}