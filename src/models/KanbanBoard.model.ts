import {KanbanColumn} from './KanbanColumn.model';

export class KanbanBoard {
    public title:string;
    public columns: Array<KanbanColumn> = [];

    constructor(title: string){
        this.title = title;
    }

    addNewColumn(title: string, columnLimit?:number){
        this.columns.push(new KanbanColumn(title, columnLimit));
    }
}