import { UsecaseInterface } from "../../../@shared/usecase/usecase.interface";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { FindInvoiceInputDto, FindInvoiceOutputDto } from "./find-invoice.dto";
export class FindInvoiceUsecase implements UsecaseInterface {
  constructor(private readonly _invoiceRepository: InvoiceGateway) {}

  async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
    const { id } = input;

    const invoice = await this._invoiceRepository.find(id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map((item) => {
        return {
          id: item.id.id,
          name: item.name,
          salePrice: item.salePrice,
        };
      }),
      total: invoice.total,
      createdAt: invoice.createdAt,
    };
  }
}
