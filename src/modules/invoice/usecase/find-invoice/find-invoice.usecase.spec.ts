import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../../domain/invoice";
import { FindInvoiceUsecase } from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "John Doe",
  document: "123456789",
  address: "Street 123",
  items: [
    {
      id: new Id("1"),
      name: "Product 1",
      salePrice: 10,
    },
    {
      id: new Id("2"),
      name: "Product 2",
      salePrice: 20,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(invoice),
    create: jest.fn(),
  };
};

describe("Find invoice usecase unit test", () => {
  it("should find a invoice", async () => {
    const invoiceRepository = mockRepository();
    const usecase = new FindInvoiceUsecase(invoiceRepository);

    const result = await usecase.execute({ id: invoice.id.id });

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address).toBe(invoice.address);
    expect(result.items).toEqual(
      invoice.items.map((item) => {
        return {
          id: item.id.id,
          name: item.name,
          salePrice: item.salePrice,
        };
      })
    );
    expect(result.total).toBe(invoice.total);
    expect(result.createdAt).toBe(invoice.createdAt);
  });
});
