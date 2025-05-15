import { Customer } from "../entities/Customer";


export abstract class CustomerRepository {
  abstract createCustomer(customer: Customer): Promise<Customer>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract findById({ id, userId }: { id: string, userId: string }): Promise<Customer | null>;
  abstract save(customer: Customer): Promise<void>;
  abstract findMany(userId: string): Promise<Customer[]>;
}