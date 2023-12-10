import { Time } from "@angular/common";

export interface Events {
    idEv: number;
    eventName: string;
    description: string;
    date: Date;
    time: Time;
    eventStatus: string;
    location: string;
    eventType: EventType;
}

export enum  EventType {
    SIMPLE = 'SIMPLE',
    SEMINAR = 'SEMINAR',
    WORKSHOP = 'WORKSHOP',
  }
