import { Component } from '@angular/core';

/**
 * Generated class for the KanbancardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kanbancard',
  templateUrl: 'kanbancard.html'
})
export class KanbancardComponent {

  text: string;

  constructor() {
    console.log('Hello KanbancardComponent Component');
    this.text = 'Hello World';
  }

}
