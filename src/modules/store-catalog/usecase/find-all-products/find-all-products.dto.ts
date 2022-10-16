export interface FindAllProductsDto {
  products: Array<{
    id: string;
    name: string;
    description: string;
    salePrice: number;
  }>;
}
