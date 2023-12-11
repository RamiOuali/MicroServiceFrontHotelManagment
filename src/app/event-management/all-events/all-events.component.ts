import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Events, EventType} from 'src/app/models/events.model';
import { EventsServiceService } from 'src/app/services/events-service.service';
@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {
  event: any[] = [];
  newRequest3: {
    eventName: string; 
    description: string;
    date: string;
    time: string;
    eventStatus: string;
    location: string;
    eventType: string; 
  } = { eventName: '', description:'' ,date:'',time:'', eventStatus: '', location: '',eventType: '' };
  
  closeResult: string = "";

  newRequest4: { idEv: any; eventName: any; description: any; date: any; time: any; eventStatus: any; location: any;  eventType: any;}= {
    idEv: '',
    eventName: '',
    description: '',
    date: '',
    time: '',
    eventStatus: '',
    location: '',
    eventType:'',

  };
  constructor(private http: HttpClient   ,private service:EventsServiceService ,private modalService: NgbModal ){
   // this.newRequest3 = { eventName: '', description:'' , date:'', time:'', eventStatus: '', location: '', eventType: '' };
  };

  list: Events [] = [];
  
  ngOnInit(){
    this.service.getAllEvents().subscribe(res=>{this.list=res});
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  open5(mymodalUpdate: any, idEv: number): void {
    // Trouver la réservation par son id
    const reservationToUpdate = this.list.find((res: { idEv: number; }) => res.idEv  === idEv);
  
    // Assurez-vous que la réservation à mettre à jour est trouvée
    if (reservationToUpdate) {
      // Mettre à jour les autres propriétés de la réservation
      this.newRequest4 = {
        idEv: reservationToUpdate.idEv,
        eventName: reservationToUpdate.eventName,
        description: reservationToUpdate.description,
        date: reservationToUpdate.date,
        time: reservationToUpdate.time,
        eventStatus: reservationToUpdate.eventStatus,
        location: reservationToUpdate.location,
        eventType: reservationToUpdate.eventType,
      };
       // Set the eventType for the update modal
    this.newRequest4.eventType = reservationToUpdate.eventType;
  
      // Ouvrir le modal
      this.modalService.open(mymodalUpdate, { ariaLabelledBy: 'modal-basic-title' });
    } else {
      console.error('Aucune event trouvée avec cet id.');
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  submitForm() {
    const formData = {
      idEv: 0, 
      eventName: this.newRequest3.eventName,
      description: this.newRequest3.description,
      date: new Date(this.newRequest3.date), // Convert to Date
      time: this.newRequest3.time,
      eventStatus: this.newRequest3.eventStatus,
      location: this.newRequest3.location,
      eventType: this.newRequest3.eventType as EventType, // Convert to EventType

    };

    this.service.createEvent(formData).subscribe(
      (response: any) => {
        if (response && response.idEv) {
          const newReservation = {
            idEv: response.idEv,
            eventName: response.eventName ,
            description: response.description ,
            date: response.date || '',
            time: response.time || '',
            eventStatus: response.eventStatus ,
            location: response.location ,
            eventType: response.eventType as EventType,
          };

          this.list.push(newReservation);

          this.newRequest3 = {
            eventName: '',
            description: '',
            date: '',
            time: '',
            eventStatus: '',
            location: '',
            eventType:''
          };

          const modalRef = this.modalService.open("Votre Evenement a été ajoutée avec succès", { windowClass: 'custom-modal-size' });
          setTimeout(() => {
            modalRef.close();  
          }, 2000);
          
        } else {
          console.error('La réponse du service est invalide', response);
        }
      },
      (error) => {
        console.error('Une erreur s\'est produite', error);
      }
    );
  }
  updateForm(idEv: any) {
    if (!this.newRequest4) {
      console.error('Aucune evenement sélectionnée pour la mise à jour');
      return;
    }

     // Convert the date string to a Date object
  const date = new Date(this.newRequest4.date);
  
    // Créez l'objet formData avec les valeurs de la réservation actuelle
    const formData = {
      idEv: idEv,
      eventName: this.newRequest4.eventName,
      description: this.newRequest4.description,
      date: date,
      time: this.newRequest4.time,
      eventStatus: this.newRequest4.eventStatus,
      location: this.newRequest4.location,
      eventType: this.newRequest4.eventType as EventType,
    };
  
    // Appelez le service pour effectuer la mise à jour
    this.service.updateEvent(formData).subscribe(
      (response) => {
        console.log('Mise à jour réussie', response);
        // Trouver l'index de l'élément à mettre à jour dans this.reserv
        const index = this.list.findIndex((res: { idEv: any; }) => res.idEv === idEv);
        // Mettez à jour seulement cet élément dans this.reserv
        this.list[index] = response;
        // Fermez le modal
        this.modalService.dismissAll();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la mise à jour', error);
        // Gérez les erreurs ici
      }
    );
  }
  
  deleterese(idEv: any) {
    this.service.deleteEvent(idEv).subscribe(
      (response) => {
        console.log('Evenement supprimée avec succès', response);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de la chambre', error);
      }
      
    );}
    delete(pos:number) {
      this.list.splice(pos,1);
    }
}
