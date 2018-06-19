import { Component } from '@angular/core';

/**
 * Generated class for the KanbanlaneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kanbanlane',
  templateUrl: 'kanbanlane.html'
})
export class KanbanlaneComponent {

  text: string;

  constructor() {
    console.log('Hello KanbanlaneComponent Component');
    this.text = 'Hello World';
  }

}
