import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagementRoutingModule } from './event-management-routing.module';
import { AllEventsComponent } from './all-events/all-events.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllEventsComponent
  ],
  imports: [
    CommonModule,
    EventManagementRoutingModule,
    FormsModule,
  ]
})
export class EventManagementModule { }
