import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';

import { KanbancardComponent } from './kanbancard/kanbancard';
import { KanbancolumnComponent } from './kanbancolumn/kanbancolumn';
import { KanbanboardComponent } from './kanbanboard/kanbanboard';

@NgModule({
    declarations: 
    [
        KanbancardComponent,
        KanbancolumnComponent,
        KanbanboardComponent
    ],
	imports: [
        BrowserModule,
        IonicModule.forRoot(ComponentsModule)
    ],
    exports: 
    [
        KanbancardComponent,
        KanbancolumnComponent,
        KanbanboardComponent
    ]
})
export class ComponentsModule {}
