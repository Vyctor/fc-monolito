import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../../store-catalog/domain/product.entity";
import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

type InvoiceProduct = {
  id?: Id;
  name: string;
  salePrice: number;
};

type TransactionProps = {
  id?: Id;
  name: string;
  document: string;
  address: string;
  items: InvoiceProduct[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: string;
  private _items: InvoiceProduct[];

  constructor(props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;

    this.validate();
  }

  private validate(): void {
    if (this._items.length <= 0) {
      throw new Error("Items must be greater than 0");
    }
  }

  get name() {
    return this._name;
  }

  get document() {
    return this._document;
  }

  get address() {
    return this._address;
  }

  get items() {
    return this._items;
  }

  get total() {
    return this._items.reduce((total, item) => total + item.salePrice, 0);
  }

  get totalItems() {
    return this._items.length;
  }
}
