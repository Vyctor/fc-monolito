export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salePrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: Array<{
    id: string;
    name: string;
    description: string;
    salePrice: number;
  }>;
}

export interface StoreCatalogFacadeInterface {
  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto>;

  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}
