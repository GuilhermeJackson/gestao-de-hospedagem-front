import { Reserve } from "./reserve.model";

export interface GuestReserve {
    name?: string;
    phone?: string;
    cpf?: string;
    reserve?: Reserve;
  }
  