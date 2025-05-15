import { User } from "src/user/entities/User";

export class UserPresenter {
  static toHTTP(entity: User) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }
}
