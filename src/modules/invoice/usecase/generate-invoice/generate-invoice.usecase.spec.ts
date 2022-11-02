import { Address } from "../../domain/value-object/address.value-object";
import { GenerateInvoiceUsecase } from "./generate-invoice.usecase";
import { Product } from "../../domain/entity/product";
import { Id } from "../../../@shared/domain/value-object/id.value-object";

const mockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
  };
};

describe("Generate Invoice Usecase", () => {
  it("should generate a invoice", async () => {
    const invoiceRepository = mockRepository();

    const usecase = new GenerateInvoiceUsecase(invoiceRepository);

    const input = {
      name: "John Doe",
      document: "123456789",
      address: new Address({
        street: "Street",
        number: "123",
        complement: "Complement",
        city: "City",
        state: "State",
        zipCode: "12345678",
      }),
      items: [
        new Product({
          id: new Id("1"),
          name: "Product 1",
          salePrice: 10,
        }),
        new Product({
          id: new Id("2"),
          name: "Product 2",
          salePrice: 20,
        }),
      ],
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.create).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.address).toBe(input.address);
    expect(result.items).toEqual(input.items);
    expect(result.total).toBe(30);
  });
});
