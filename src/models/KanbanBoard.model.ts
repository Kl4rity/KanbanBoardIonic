
import {KanbanColumn} from './KanbanColumn.model';
import { KanbanCard } from './KanbanCard.model';

export class KanbanBoard {
    public title:string;
    public columns: Array<KanbanColumn> = [];

    constructor(title: string){
        this.title = title;
    }

    addNewColumn(title: string, columnLimit?:number): void{
        this.columns.push(new KanbanColumn(title, columnLimit));
    }

    isValidColumn(indexOfColumn: number): boolean{
        if(this.columns[indexOfColumn]){
            return true;
        }
        return false;
    }

    moveCardToColumn(cardToBeMoved: KanbanCard, columnTobeMovedFrom: KanbanColumn, shiftBy: number): boolean{
        
        let indexOfColumn: number = this.getColumnIndex(columnTobeMovedFrom);
        let targetIndexOfColumn: number = indexOfColumn + shiftBy;

        if(this.isValidColumn(targetIndexOfColumn)){
            // Filter the cards list and return one where the card isn't present anymore.
            this.columns.map((column, index)=>{
                this.columns[index].cards = column.cards.filter(card => card!==cardToBeMoved);
            });

            // Push the card onto the column it needs to be in.
            this.columns[targetIndexOfColumn].cards.push(cardToBeMoved);
            return true;
        }
        return false;
    }

    getColumnIndex(column: KanbanColumn): number{
        return this.columns.indexOf(column);
    }
}