import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { ToastController, ModalController, Slides } from 'ionic-angular';
import { AddcolumnPage } from '../../pages/addcolumn/addcolumn';
import { AddCardPage } from '../../pages/add-card/add-card';


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
  @ViewChild(Slides) slides: Slides;
  @Output() columnChange: EventEmitter<any>;

  text: string;

  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.columnChange = new EventEmitter<any>();
  }

  ngAfterContentChecked(){
    if(this.board.columns.length === 1){
      this.columnChange.emit({columnIndex: 0});
    }
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

  onAddColumn(currentBoard: KanbanBoard){
    const modal = this.modalCtrl.create(AddcolumnPage, {board: currentBoard});
    modal.present();
  }

  onAddCard(currentBoard: KanbanBoard){
    const modal = this.modalCtrl.create(AddCardPage, {board: currentBoard, column: this.slides.getActiveIndex()});
    modal.present();
  }

  slideChanged(){
    console.log("slideChanged() :" + this.slides.getActiveIndex());
    this.columnChange.emit({columnIndex: this.slides.getActiveIndex()});
  }
}
