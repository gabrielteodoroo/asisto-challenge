import { Customer } from "src/customer/entities/Customer";

export class CustomerPresenter {
  static toHTTP(entity: Customer) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }
}
