import { KanbanBoard } from '../models/KanbanBoard.model';
import { KanbanColumn } from '../models/KanbanColumn.model';
import { KanbanCard } from '../models/KanbanCard.model';


export function buildTutorialBoard(): KanbanBoard {
    const tutorialBoard = new KanbanBoard("Tutorial");

    tutorialBoard.columns.push(buildBacklog());
    tutorialBoard.columns.push(buildInProgress());
    tutorialBoard.columns.push(buildDone());

    return tutorialBoard;
}

function buildBacklog(): KanbanColumn {
    const backlogColumn = new KanbanColumn("Backlog");
    backlogColumn.addNewCard(
        "Welcome to Kanban!",
        2,
        "A minimalist KanbanBoard manager.");

    backlogColumn.addNewCard(
        "What's that?",
        2,
        "Boards are organized into columns, whilst columns contain cards. This is a card!");

    backlogColumn.addNewCard(
        "What do cards consist of?",
        2,
        "Cards have a title, optional further content and a time estimate. They represent a task you want to complete."
    );

    backlogColumn.addNewCard(
        "Time estimate you say?",
        99,
        "The time estimate is vague on purpose. You choose whether a unit is one Pomodoro, one hour or one marsian day."
    );

    backlogColumn.addNewCard(
        "Cool! How do I use it?",
        2,
        "Swipe right to find out."
    );
    return backlogColumn;
}

function buildInProgress(): KanbanColumn {
    const inProgressColumn = new KanbanColumn("In Progress");

    inProgressColumn.addNewCard(
        "How do I add items?",
        2,
        "You add items by using the big plus in the bottom right corner. You finish editing one line by pressing ENTER. Press ENTER on the last row to save your card / column / board."
    );
    inProgressColumn.addNewCard(
        "How do I edit items?",
        2,
        "You can edit items you see by long-pressing on them. Again, pressing ENTER jumps to the next field and finishes editing when in the last field. Try editing this card!"
    );
    inProgressColumn.addNewCard(
        "How do I reorder items?",
        2,
        "There's a little handle on the top right, press on it and drag the card (or other item like a column or board for that matter) to where you want it to be!"
    );
    inProgressColumn.addNewCard(
        "Okay great. But how can I edit columns?",
        2,
        "See that in the top right? This is the button that leads you to the screen for adding / deleting / reordering columns. Don't forget the long-press for editing!"
    );
    inProgressColumn.addNewCard(
        "Anything else?",
        2,
        "Swipe right."
    );
    return inProgressColumn;
}

function buildDone(): KanbanColumn {
    const doneColumn = new KanbanColumn("Done");

    doneColumn.addNewCard(
        "You're ready to rock and roll!",
        2,
        "Start off by going back and creating your very own first board."
    );

    doneColumn.addNewCard(
        "Keep me around... or don't.",
        2,
        "I suggest you keep the tutorial around for a bit until you get a hang of the tool. Feel free to delete it though if you're super comfortable already!"
    );

    doneColumn.addNewCard(
        "Go!",
        2,
        "Productivity is calling!"
    );
    return doneColumn;
}