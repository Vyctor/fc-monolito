import { GenerateInvoiceUsecase } from "./generate-invoice.usecase";

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
      address: "Street 123",
      items: [
        {
          id: "1",
          name: "Product 1",
          salePrice: 10,
        },
        {
          id: "2",
          name: "Product 2",
          salePrice: 20,
        },
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
