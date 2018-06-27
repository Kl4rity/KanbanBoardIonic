import {KanbanCard} from './KanbanCard.model';

export class KanbanColumn {
    public title: string;
    public columnLimit: number;
    public cards: Array<KanbanCard> = [];

    constructor(title: string, columnLimit?:number){
        this.title = title;
        this.columnLimit = columnLimit;
    }

    addNewCard(title:string, timeEstimate:number, content?:string){
        if(this.isUnderColumnLimit()){
            this.cards.push(new KanbanCard(title, timeEstimate, content));
            return true;
        } else {
            console.warn("KanbanColumn could not add item since column is already at it's columnLimit.");
            return false;
        }
    }

    isUnderColumnLimit(){
        // Can only return false if a column-limit is actually set.
        if(this.columnLimit){
            return (this.cards.length < this.columnLimit);
        } else {
            return true;
        }
    }
}