import { ID_MULTIPLIER } from '../shared/config.config';

export class KanbanCard {
    public title: string;
    public content: string;
    public timeEstimate: number;
    public timeWorked: number;
    public id: string;

    //Should I be creating IDs for each card?

    constructor(title: string, timeEstimate: number, content?: string, id?: string) {
        this.title = title;
        this.content = content;
        this.timeEstimate = timeEstimate;
        this.timeWorked = 0;
        if (id) {this.id = id} else {this.id = (Math.random() * ID_MULTIPLIER).toFixed()};
    }
}