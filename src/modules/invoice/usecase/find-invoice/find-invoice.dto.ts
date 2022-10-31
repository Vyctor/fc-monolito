import { Address } from "../../../@shared/domain/value-object/address.value-object";
export interface FindInvoiceInputDto {
  id: string;
}

export interface FindInvoiceOutputDto {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: {
    id: string;
    name: string;
    salePrice: number;
  }[];
  total: number;
  createdAt: Date;
}
