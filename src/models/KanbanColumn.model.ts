import { KanbanCard } from './KanbanCard.model';
import { ID_MULTIPLIER } from '../shared/config.config';

export class KanbanColumn {
    public title: string;
    public columnLimit: number = 99;
    public cards: Array<KanbanCard> = [];
    public id: string;

    constructor(title: string, columnLimit?: number, id?:string) {
        this.title = title;
        if (id) {this.id = id} else {this.id = (Math.random() * ID_MULTIPLIER).toFixed()};
        if (columnLimit) { this.columnLimit = columnLimit;}
    }

    addNewCard(title: string, timeEstimate: number, content?: string) {
        if (this.isUnderColumnLimit()) {
            this.cards.push(new KanbanCard(title, timeEstimate, content));
            return true;
        } else {
            console.warn("KanbanColumn could not add item since column is already at it's columnLimit.");
            return false;
        }
    }

    isUnderColumnLimit() {
        // Can only return false if a column-limit is actually set.
        if (this.columnLimit) {
            return (this.cards.length < this.columnLimit);
        } else {
            return true;
        }
    }
}