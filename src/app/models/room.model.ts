export interface Room {
    id: number;
    type: TypeRoom;
    status: RoomStatus;
}

export enum  TypeRoom {
    SINGLE = 'SINGLE',
    DOUBLE = 'DOUBLE',
    SUITE = 'SUITE',
    DELUXE = 'DELUXE',
    FAMILY = 'FAMILY',
    CONFERENCE = 'CONFERENCE',
  }
  
export enum  RoomStatus {
    OCCUPIED = 'OCCUPIED',
    AVAILABLE = 'AVAILABLE',
    HORS_SERVICE = 'HORS_SERVICE',
  }

