export interface Reservation {
    numRes: number;
    checkIn: Date;
    checkOut: Date;
    valid: Boolean;
    typeReservation: TypeR;
}

export enum  TypeR {
    BUG='BUG',
    FEATURE_REQUEST="FEATURE_REQUES",
    GENERAL_FEEDBACK=" GENERAL_FEEDBACK",
    OTHER=" OTHER"

  }