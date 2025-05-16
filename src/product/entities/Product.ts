import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";


interface ProductSchema {
  name: string;
  description?: string;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  private props: ProductSchema;
  private _id: string;

  constructor(props: Replace<ProductSchema, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
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


  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  set description(description: string | undefined) {
    this.props.description = description;
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

  get customerId(): string {
    return this.props.customerId;
  }
}