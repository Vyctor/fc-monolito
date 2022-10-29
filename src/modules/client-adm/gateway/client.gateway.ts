import { Client } from "../domain/client.entity";

export interface ClientGateway {
  add(input: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
