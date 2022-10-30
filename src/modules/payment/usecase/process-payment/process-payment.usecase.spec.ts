import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../../domain/transaction";
import { ProcessPaymentUsecase } from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const MockRepository = () => {
  return {
    save: jest.fn().mockResolvedValue(transaction),
  };
};

describe("Process Payment Usecase unit test", () => {
  it("should process payment", async () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUsecase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toBeDefined();
    expect(result.status).toBe("approved");
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(transaction.id.id);
    expect(result.orderId).toBe(input.orderId);
    expect(result.amount).toBe(input.amount);
  });
});
