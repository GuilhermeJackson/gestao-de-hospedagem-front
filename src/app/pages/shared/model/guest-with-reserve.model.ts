import { Guest } from "./guest.model";

export interface GuestWithReserve {
  id: number;
  checkin?: Date;
  checkout: Date;
  guest: Guest;
  prevCheckin: Date;
  prevCheckout: Date;
}
