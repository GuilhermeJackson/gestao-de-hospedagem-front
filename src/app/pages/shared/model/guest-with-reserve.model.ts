import { Guest } from "./guest.model";

export interface GuestWithReserve {
    checkin: Date;
    checkout: Date;
    guest: Guest;
    prevCheckin: Date;
    prevCheckout: Date;
  }
  