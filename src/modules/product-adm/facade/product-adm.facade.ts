import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import {
  AddProductFacadeInputDto,
  CheckInventoryFacadeInputDto,
  CheckInventoryFacadeOutputDto,
  ProductAdmFacadeInterface,
} from "./product-adm.facade.interface";

export interface UsecasesProps {
  addUsecase: UsecaseInterface;
  checkInventoryUsecase: UsecaseInterface;
}

export class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUsecase: any;
  private _checkInventoryUsecase: any;

  constructor(usecasesProps: UsecasesProps) {
    this._addProductUsecase = usecasesProps.addUsecase;
    this._checkInventoryUsecase = usecasesProps.checkInventoryUsecase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addProductUsecase.execute(input);
  }

  async checkInventory(
    input: CheckInventoryFacadeInputDto
  ): Promise<CheckInventoryFacadeOutputDto> {
    return this._checkInventoryUsecase.execute(input);
  }
}
