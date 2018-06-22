import { Component, Input } from '@angular/core';

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

  @Input() card: Object;

  constructor() {
    
  }

}
