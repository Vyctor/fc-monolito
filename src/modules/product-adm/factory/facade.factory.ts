import { ProductAdmFacade } from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUsecase } from "../usecase/add-product/add-product.usecase";

export class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUsecase = new AddProductUsecase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUsecase: addProductUsecase,
      checkInventoryUsecase: null,
    });

    return productFacade;
  }
}
