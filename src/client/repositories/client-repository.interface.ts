import { Client } from "../entities/Client";

export abstract class ClientRepository {
  abstract createUser(user: Client): Promise<Client>;
  abstract findByEmail(email: string): Promise<Client | null>;
  abstract findById(id: string): Promise<Client | null>;
  abstract save(user: Client): Promise<void>;
  abstract findMany(): Promise<Client[]>;
}