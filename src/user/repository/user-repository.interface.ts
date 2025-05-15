import { User } from "../entities/User";

export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract findMany(): Promise<User[]>;
}