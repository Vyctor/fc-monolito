import { PlaceOrderUsecase } from "./place-order.usecase";
import { PlaceOrderInputDto } from "./place-order.dto";

const mockDate = new Date(2000, 1, 1);

describe("Place Order Usecase unit test", () => {
  describe("validateProducts method", () => {
    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase();

    it("should throw an error if no products are selected", async () => {
      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("No products selected"));
    });

    it("should throw an error when product is out of stock", async () => {
      const mockProductFacade = {
        checkInventory: jest.fn(({ productId }: { productId: string }) =>
          Promise.resolve({
            productId,
            inventory: productId === "1" ? 0 : 10,
          })
        ),
      };

      // @ts-expect-error - force set productFacade
      placeOrderUsecase["_productFacade"] = mockProductFacade;

      let input: PlaceOrderInputDto = {
        clientId: "1",
        products: [{ productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not available in stock"));

      input = {
        clientId: "2",
        products: [{ productId: "2" }, { productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not available in stock"));
      expect(mockProductFacade.checkInventory).toHaveBeenCalledTimes(3);

      input = {
        clientId: "2",
        products: [{ productId: "2" }, { productId: "3" }, { productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not available in stock"));
      expect(mockProductFacade.checkInventory).toHaveBeenCalledTimes(6);
    });
  });

  describe("getProducts method", () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase();

    it("should throw an error when product not found", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      // @ts-expect-error - force set productFacade
      placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

      await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow(
        new Error("Product not found")
      );
    });
  });

  describe("execute method", () => {
    it("should throw an error when client not found", async () => {
      const mockClientFacade = {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(null),
      };

      // @ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();
      placeOrderUsecase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = { clientId: "123", products: [] };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        new Error("Client not found")
      );
    });

    it("should throw an error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
        add: jest.fn(),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUsecase();
      placeOrderUseCase["_clientFacade"] = mockClientFacade;

      const mockValidateProducts = jest
        .spyOn(
          placeOrderUseCase,
          //@ts-expect-error - spy on private method
          "validateProducts"
        )
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      const input: PlaceOrderInputDto = { clientId: "1", products: [] };
      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("No products selected")
      );
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });
  });
});
