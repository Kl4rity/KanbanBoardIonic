import { Component, Input } from '@angular/core';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the KanbanboardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kanbanboard',
  templateUrl: 'kanbanboard.html'
})
export class KanbanboardComponent {

  @Input() board: KanbanBoard;
  text: string;

  constructor(public toastCtrl: ToastController) {
    console.log('Hello KanbanboardComponent Component');
    this.text = 'Hello World';
  }

  moveCard($event){
    // Actual moving of data done by the baordModel.
    let success: boolean = this.board.moveCardToColumn($event.card, $event.column, $event.shift);
    // Display a Toast message on failure.
    if(!success){
        this.showToast("Cannot move Card off Board.");
      }
  }

  showToast(notification: string) {
    let toast = this.toastCtrl.create({
      message: notification,
      duration: 2000,
      position: "top"
    });

    toast.present(toast);
  }
}
