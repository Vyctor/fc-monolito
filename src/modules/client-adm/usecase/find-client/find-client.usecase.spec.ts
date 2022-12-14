import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { FindClientUsecase } from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "John Doe",
  email: "email@email.com",
  address: "Address 1",
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(client),
  };
};

describe("Find Client Usecase unit test", () => {
  it("should find a client", async () => {
    const repository = MockRepository();

    const usecase = new FindClientUsecase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
  });
});
