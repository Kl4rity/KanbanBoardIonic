
import { KanbanColumn } from './KanbanColumn.model';
import { KanbanCard } from './KanbanCard.model';
import { ID_MULTIPLIER } from '../shared/config.config';

export class KanbanBoard {
    public title: string;
    public id: string;
    public columns: Array<KanbanColumn> = [];

    constructor(title: string, id?:string) {
        this.title = title;
        if (id) {this.id = id} else {this.id = (Math.random() * ID_MULTIPLIER).toFixed()};
    }

    addNewColumn(title: string, columnLimit?: number): void {
        this.columns.push(new KanbanColumn(title, columnLimit));
    }

    isValidColumn(indexOfColumn: number): boolean {
        if (this.columns[indexOfColumn]) {
            return true;
        }
        return false;
    }

    moveCardToColumn(cardToBeMoved: KanbanCard, columnTobeMovedFrom: KanbanColumn, shiftBy: number): boolean {

        let originalColumnIndex: number = this.getColumnIndex(columnTobeMovedFrom);
        let targetColumnIndex: number = originalColumnIndex + shiftBy;

        // Get the original position of the card
        let targetPositionInTargetColumn: number = columnTobeMovedFrom.cards.indexOf(cardToBeMoved);

        if (this.isValidColumn(targetColumnIndex)) {
            this.removeCardFromOriginalColumn(originalColumnIndex, cardToBeMoved);
            this.addCardToTargetColumn(targetColumnIndex, cardToBeMoved, targetPositionInTargetColumn);
            return true;
        }
        return false;
    }

    getColumnIndex(column: KanbanColumn): number {
        return this.columns.indexOf(column);
    }

    removeCardFromOriginalColumn(originalColumnIndex: number, cardToBeMoved: KanbanCard){
        this.columns[originalColumnIndex].cards = this.columns[originalColumnIndex].cards.filter(card => card !== cardToBeMoved);
    }

    addCardToTargetColumn(targetColumnIndex: number, cardToBeMoved: KanbanCard, targetPosition: number){
        
        this.columns[targetColumnIndex].cards.splice(targetPosition, 0, cardToBeMoved);
        // this.columns[targetColumnIndex].cards.push(cardToBeMoved);
    }
}