import { UsecaseInterface } from "../../../@shared/usecase/usecase.interface";
import { Invoice } from "../../domain/entity/invoice";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { Product } from "../../domain/entity/product";

export class GenerateInvoiceUsecase implements UsecaseInterface {
  constructor(private readonly _invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items.map((item) => {
        return new Product({
          id: item.id,
          name: item.name,
          salePrice: item.salePrice,
        });
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this._invoiceRepository.create(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map((item) => {
        return new Product({
          id: item.id,
          name: item.name,
          salePrice: item.salePrice,
        });
      }),
      total: invoice.total,
    };
  }
}