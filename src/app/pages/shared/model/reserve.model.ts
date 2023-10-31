export interface Reserve {
    checkin?: Date;
    checkout?: Date;
    prevCheckin: Date;
    prevCheckout: Date;
    id_guest: number;
    isGarage: boolean;
}
