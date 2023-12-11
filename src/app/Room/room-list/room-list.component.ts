import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room,TypeRoom, RoomStatus } from 'src/app/models/room.model';
import { RoomServiceService } from 'src/app/services/room-service.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  roomForm: FormGroup;
  editRoomForm: FormGroup;
  rooms: Room[] = [];
  editing: boolean = false;
  editingRoomId: number;

  roomTypes = Object.values(TypeRoom);
  roomStatuses = Object.values(RoomStatus);

  constructor(private roomService: RoomServiceService) {}

  ngOnInit(): void {
    this.initForm();
    this.getRooms();
  }

  initForm() {
    this.roomForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      // Add other form controls as needed
    });

    this.editRoomForm = new FormGroup({
      status: new FormControl('', [Validators.required]),
      // Only include the status field for updating
    });
  }

  getRooms() {
    this.roomService.getAllRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  onSubmit() {
    const newRoom: Room = {
      id: null, // It will be assigned by the server
      ...this.roomForm.value,
    };

    this.roomService.addRoom(newRoom).subscribe(() => {
      this.getRooms();
      this.roomForm.reset();
    });
  }

  editRoom(roomId: number) {
    this.editing = true;
    this.editingRoomId = roomId;
  }

  onEditSubmit() {
    const roomId = this.editingRoomId;
    const newStatus = this.editRoomForm.value.status;
  
    this.roomService.updateRoomStatus(roomId, newStatus).subscribe(() => {
      this.getRooms();
      this.editing = false;
      this.editRoomForm.reset();
    });
  }

  deleteRoom(roomId: number) {
    this.roomService.deleteRoom(roomId).subscribe(() => {
      this.getRooms();
    });
  }
}