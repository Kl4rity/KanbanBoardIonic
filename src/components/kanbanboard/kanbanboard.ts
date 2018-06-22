import { Component } from '@angular/core';

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

  board: Object;
  text: string;

  constructor() {
    this.board = {
      name: "FH Technikum Wien"
      , columns: [
        {
          name: "Backlog"
          ,items: [
            {title: "Cross Platform Project" , content: "Work on the cross platform project."}
            , {title: "Get used to Angular" , content: "What exactly is the difference between Angular 2 and 6?!"}
            , {title: "Finish Change Management Presentation" , content: "Meet with Fahri to work on the presentation."}
            , {title: "React?" , content: "Should you be reading up on react or sticking with Angular for now?"}
          ]
        }
        , {
          name: "Next"
          , items: [
            {title: "Go climbing", content: "It's been a while since you did sports."}
            , {title: "Meet Can", content: "And play some Titanfall 2?"}
            , {title: "Movie Night", content: "Invite Raffi, Theo etc. to watch the new A-Team movie on Thursday"}
            , {title: "Witcher 3", content: "You still haven't finished that game. Go sit down and chill."}
            , {title: "Meet Can", content: "And play some Titanfall 2?"}
            , {title: "Movie Night", content: "Invite Raffi, Theo etc. to watch the new A-Team movie on Thursday"}
            , {title: "Witcher 3", content: "You still haven't finished that game. Go sit down and chill."}
          ]
        }
        , {
          name: "In Progress"
          , items: [
            {title: "Procrastination", content: "Nice plans you have there? Wanna work on them? Too bad. You gotta procrastinate now."}
          ]
        }
        , {
          name: "Done"
          , items: [
            {title: "Nothing." , content: "Crickets...."}
          ]
        }
      ]
    }
    console.log('Hello KanbanboardComponent Component');
    this.text = 'Hello World';
  }

}
