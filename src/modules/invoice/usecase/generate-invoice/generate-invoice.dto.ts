import { Address } from "../../../@shared/domain/value-object/address.value-object";
export interface GenerateInvoiceUseCaseInputDto {
  name: string;
  document: string;
  address: Address;
  items: {
    id: string;
    name: string;
    salePrice: number;
  }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
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
}
