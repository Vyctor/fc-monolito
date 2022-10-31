export interface FindInvoiceInputDto {
  id: string;
}

export interface FindInvoiceOutputDto {
  id: string;
  name: string;
  document: string;
  address: string;
  items: {
    id: string;
    name: string;
    salePrice: number;
  }[];
  total: number;
  createdAt: Date;
}
