import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ReclamationServiceService } from './../../services/reclamation-service.service';
import { Reclamation } from './../../models/reclamation.model';
import { Component, OnInit } from '@angular/core';
import { TypeR } from 'src/app/models/reservation.model';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {
  constructor(private service: ReclamationServiceService) {

  }
  ngOnInit(): void {
    this.initForm();
    this.getRooms();
  }
  roomForm: FormGroup;
  editRoomForm: FormGroup;
  rooms: Reclamation[] = [];
  editing: boolean = false;
  editingRoomId: number;

  ReclamationTypes = Object.values(TypeR);



  initForm() {
    this.roomForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      description :new FormControl('', [Validators.required]),
      // Add other form controls as needed
    });

    this.editRoomForm = new FormGroup({
      status: new FormControl(this.editRoomForm, [Validators.required]),
    });
  }
  onSubmit() {
    console.log("submitting")
    const newReclamation: Reclamation = {
      ...this.roomForm.value,
    };
    console.log(newReclamation)


    this.service.addReclamation(newReclamation).subscribe(() => {
      this.getRooms();
      this.roomForm.reset();
    });
  }


  reclamations: Reclamation[] = [];
  getRooms() {
    this.service.getAllReclamations().subscribe((data) => {
      this.reclamations = data;
    });
  }

  editReport(roomId: number) {
    this.editing = true;
    this.editingRoomId = roomId;
  }

  onEditSubmit() {
    const roomId = this.editingRoomId;
    const newStatus = this.editRoomForm.value.status;
  
    this.service.updateReclamation(roomId).subscribe(() => {
      this.getRooms();
      this.editing = false;
      this.editRoomForm.reset();
    });
  }

  deleteRoom(roomId: number) {
    this.service.deleteReclamation(roomId).subscribe(() => {
    });
  }

}
