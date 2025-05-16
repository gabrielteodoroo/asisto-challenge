import { Product } from "src/product/entities/Product";

export class ProductPresenter {
  static toHTTP(entity: Product) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }
}
