export class KanbanCard {
    public title: string;
    public content: string;
    public timeEstimate: number;
    public timeWorked: number;

    //Should I be creating IDs for each card?

    constructor(title:string, timeEstimate: number, content?: string){
        this.title = title;
        this.content = content;
        this.timeEstimate = timeEstimate;
        this.timeWorked = 0;
    }
}