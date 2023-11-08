import { Guest } from "./guest.model";

export interface GetCheckoutData {
  id: number;
  checkin: Date;
  checkout: Date;
  guest: Guest;
  prevCheckin: Date;
  prevCheckout: Date;
  isGarage: boolean

  }
  