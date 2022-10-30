import { Sequelize } from "sequelize-typescript";
import { PaymentFacadeFactory } from "../factory/payment.facade.factory";
import { TransactionModel } from "../repository/transaction.model";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUsecase } from "../usecase/process-payment/process-payment.usecase";
import { PaymentFacade } from "./payment.facade";

describe("Payment Facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a transaction", async () => {
    const facade = PaymentFacadeFactory.create();

    const input = {
      orderId: "1",
      amount: 100,
    };

    const output = await facade.process(input);

    expect(output.transactionId).toBeDefined();
    expect(output.orderId).toEqual(input.orderId);
    expect(output.amount).toEqual(input.amount);
    expect(output.status).toEqual("approved");
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  });
});
