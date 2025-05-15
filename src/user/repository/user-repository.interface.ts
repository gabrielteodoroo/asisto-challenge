import { User } from "../entities/User";

export abstract class UserRepository {
  abstract createrUser(user: User): Promise<void>;
}