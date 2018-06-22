import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';

import { KanbancardComponent } from './kanbancard/kanbancard';
import { KanbancolumnComponent } from './kanbancolumn/kanbancolumn';
import { KanbanlaneComponent } from './kanbanlane/kanbanlane';
import { KanbanboardComponent } from './kanbanboard/kanbanboard';

@NgModule({
	declarations: [KanbancardComponent,
    KanbancolumnComponent,
    KanbanlaneComponent,
    KanbanboardComponent],
	imports: [
        BrowserModule,
        IonicModule.forRoot(ComponentsModule)
    ],
    exports: 
    [
        KanbancardComponent,
        KanbancolumnComponent,
        KanbanlaneComponent,
        KanbanboardComponent
    ]
})
export class ComponentsModule {}
