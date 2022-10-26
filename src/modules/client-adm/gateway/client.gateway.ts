import { Client } from "../domain/client.entity";
import { AddClientInputDto } from "../usecase/add-client/add-client.usecase.dto";

export interface ClientGateway {
  add(input: AddClientInputDto): Promise<void>;
  find(id: string): Promise<Client>;
}
