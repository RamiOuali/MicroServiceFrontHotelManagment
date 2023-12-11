import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationServiceService } from 'src/app/services/reservation-service.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {

 reserv : any = []= [];
  newRequest3: {
    checkIn: string; 
    checkOut:string
    valid: boolean;
    typeReservation:string; // Ajoutez la déclaration de numeroChambre ici
  } = { checkIn: '', checkOut:'' ,valid: false, typeReservation: '' }; // Initialisez numeroChambre
  
  closeResult: string;
  newRequest4: { numRes: any; checkIn: any; checkOut: any; valid: any; typeReservation: any; }= {
    numRes: '',
    checkIn: '',
    checkOut: '',
    valid:false ,
    typeReservation:''

  };
  constructor(private http: HttpClient   ,private service:ReservationServiceService ,private modalService: NgbModal ){
    this.newRequest3 = { checkIn: '', checkOut:'' ,valid: false, typeReservation: ''  };
  };
  list : Reservation []
  
  ngOnInit(){

    this.service.getAllReservations().subscribe(res=>{this.list=res });
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  open5(mymodalUpdate: any, numRes: number): void {
    // Trouver la réservation par son id
    const reservationToUpdate = this.list.find((res: { numRes: number; }) => res.numRes === numRes);
  
    // Assurez-vous que la réservation à mettre à jour est trouvée
    if (reservationToUpdate) {
      // Mettre à jour les autres propriétés de la réservation
      this.newRequest4 = {
        numRes: reservationToUpdate.numRes,
        checkIn: reservationToUpdate.checkIn,
        checkOut: reservationToUpdate.checkOut,
        valid: reservationToUpdate.valid,
        typeReservation: reservationToUpdate.typeReservation,
      };
  
      // Ouvrir le modal
      this.modalService.open(mymodalUpdate, { ariaLabelledBy: 'modal-basic-title' });
    } else {
      console.error('Aucune réservation trouvée avec cet id.');
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
      checkIn: this.newRequest3.checkIn,
      checkOut: this.newRequest3.checkOut,
      valid: this.newRequest3.valid,
      typeReservation: this.newRequest3.typeReservation
    };

    this.service.addReservation(formData).subscribe(
      (response: any) => {
        if (response && response.numRes) {
          const newReservation = {
            numRes: response.numRes,
            checkIn: response.checkIn || '',
            checkOut: response.checkOut || '',
            valid: response.valid !== null ? response.valid : false,
            typeReservation: response.typeReservation || ''
          };

          this.list.push(newReservation);

          this.newRequest3 = {
            checkIn: '',
            checkOut: '',
            valid: false,
            typeReservation: ''
          };

          const modalRef = this.modalService.open("Votre Réservation a été ajoutée avec succès", { windowClass: 'custom-modal-size' });
          setTimeout(() => {
            modalRef.close();  // Utilisez modalRef.close() pour fermer le modal
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
  updateForm(id: any) {
    // Assurez-vous que la réservation à mettre à jour est définie
    if (!this.newRequest4) {
      console.error('Aucune réservation sélectionnée pour la mise à jour');
      return;
    }
  
    // Créez l'objet formData avec les valeurs de la réservation actuelle
    const formData = {
      numRes: id,
      checkIn: this.newRequest4.checkIn,
      checkOut: this.newRequest4.checkOut,
      valid: this.newRequest4.valid,
      typeReservation: this.newRequest4.typeReservation
    };
  
    // Appelez le service pour effectuer la mise à jour
    this.service.UpdateReservation(formData).subscribe(
      (response) => {
        console.log('Mise à jour réussie', response);
        // Trouver l'index de l'élément à mettre à jour dans this.reserv
        const index = this.list.findIndex((res: { numRes: any; }) => res.numRes === id);
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
  
  deleterese(numRes: any) {
    
  
    this.service.deleteReservation(numRes).subscribe(
      (response) => {
        console.log('Chambre supprimée avec succès', response);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de la chambre', error);
      }
      
    );}
    delete(pos:number) {
      this.list.splice(pos,1);
    }

 

  
}
