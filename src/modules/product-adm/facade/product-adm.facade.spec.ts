import { Sequelize } from "sequelize-typescript";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";

describe("Product Adm Facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      inventory: 100,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({
      where: {
        id: input.id,
      },
    });

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.inventory).toBe(input.inventory);
  });

  it("should check a product inventory", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      inventory: 100,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({
      where: {
        id: input.id,
      },
    });

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.inventory).toBe(input.inventory);

    const checkInventoryInput = {
      productId: input.id,
    };

    const checkInventoryOutput = await productFacade.checkInventory(
      checkInventoryInput
    );

    expect(checkInventoryOutput).toBeDefined();
    expect(checkInventoryOutput.productId).toBe(input.id);
    expect(checkInventoryOutput.inventory).toBe(input.inventory);
  });
});
