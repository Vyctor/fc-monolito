import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import { Id } from "../../../@shared/domain/value-object/id.value-object";

type InvoiceProduct = {
  id?: Id;
  name: string;
  salePrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _salePrice: number;

  constructor(props: InvoiceProduct) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._salePrice = props.salePrice;
  }

  get name(): string {
    return this._name;
  }

  get salePrice(): number {
    return this._salePrice;
  }
}
