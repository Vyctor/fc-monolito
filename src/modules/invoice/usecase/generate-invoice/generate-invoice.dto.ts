import { Address } from "../../domain/value-object/address.value-object";
import { Product } from "../../domain/entity/product";
export interface GenerateInvoiceUseCaseInputDto {
  name: string;
  document: string;
  address: Address;
  items: Product[];
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: Product[];
  total: number;
}
