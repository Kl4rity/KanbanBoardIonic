import { NgModule } from '@angular/core';
import { KanbancardComponent } from './kanbancard/kanbancard';
import { KanbancolumnComponent } from './kanbancolumn/kanbancolumn';
import { KanbanlaneComponent } from './kanbanlane/kanbanlane';
import { KanbanboardComponent } from './kanbanboard/kanbanboard';
@NgModule({
	declarations: [KanbancardComponent,
    KanbancolumnComponent,
    KanbanlaneComponent,
    KanbanboardComponent],
	imports: [],
	exports: [KanbancardComponent,
    KanbancolumnComponent,
    KanbanlaneComponent,
    KanbanboardComponent]
})
export class ComponentsModule {}
