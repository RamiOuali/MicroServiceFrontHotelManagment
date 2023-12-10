export interface Reservation {
    numRes: number;
    checkIn: Date;
    checkOut: Date;
    valid: Boolean;
    typeReservation: TypeR;
}

export enum  TypeR {
    Room  = 'Room',
    Event = 'Event',
  }