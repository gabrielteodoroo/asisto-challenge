import { randomUUID } from "crypto";
import { User } from "src/user/entities/User";
import { Replace } from "src/utils/replace";


interface CustomerSchema {
  name: string;
  email: string;
  user: User
  createdAt: Date;
  updatedAt: Date;
}

export class Customer {
  private props: CustomerSchema;
  private _id: string;

  constructor(props: Replace<CustomerSchema, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get user() {
    return this.props.user;
  }
}