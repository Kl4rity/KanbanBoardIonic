import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { KanbanCard } from '../../models/KanbanCard.model';
import { KanbanColumn } from '../../models/KanbanColumn.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';
import { AuthProvider } from '../authentication/auth.provider';

@Injectable()
export class BoardsdataProvider {
  public boards = new Array<KanbanBoard>();
  public boards$: BehaviorSubject<KanbanBoard[]>;
  public uid: string;

  constructor(
    public http: HttpClient,
    private afdb: AngularFireDatabase,
    private auth: AuthProvider
  ) {
    // this.initializeLoadingBoardsFromStorage();
    this.fetchFireBaseData();
  }


  // Workflow for building model from data pushed by FireBase;
  // The JSON is "dropped" into this function via the subscribe - is built into the model specified into /src/models/* and that data is then 
  // pushed onto a behavioursubject.

  // Further down, the C(R)UD operations for the board, column and card are specified

  // Towards the end of the file, the save-operation in specified.
  fetchFireBaseData() {
    this.auth.user.subscribe((user) => {
      
      this.boards$ = new BehaviorSubject<KanbanBoard[]>(null);
      

      if(!user){
        return;
      }

      this.boards$.skip(1).subscribe((boards) => {
        if (boards == null) {
          this.boards = new Array<KanbanBoard>();
        }
        this.boards = boards;
      });

      if (user && user.uid) {
        this.afdb.object('/users/' + user.uid + '/boards').valueChanges().map((boards: Object) => {
          this.uid = user.uid;
          if (boards == null) {
            this.createTutorialBoard();
          }

          let newKanbanBoards: Array<KanbanBoard> = [];
          for (let key in boards) {
            let tempBoard;
            if (boards.hasOwnProperty(key)) {
              let board = boards[key];
              tempBoard = new KanbanBoard(board.title, board.id);
              tempBoard.columns = this.buildColumns(board.columns);
              newKanbanBoards.push(tempBoard);
            };
          };
          return newKanbanBoards;
        }).subscribe((kanbanBoards) => {
          this.boards$.next(kanbanBoards);
        });
      }
    });
  }

  buildColumns(columns: Object): Array<KanbanColumn> {
    let newKanbanColumns = new Array<KanbanColumn>();
    for (let columnKey in columns) {
      let tempColumn;
      if (columns.hasOwnProperty(columnKey)) {
        let column = columns[columnKey];
        tempColumn = new KanbanColumn(column.title, column.id);
        tempColumn.cards = this.buildCards(column.cards);
      }
      newKanbanColumns.push(tempColumn);
    }
    return newKanbanColumns;
  }

  buildCards(cards: Object): Array<KanbanCard> {
    let newKanbanCards = new Array<KanbanCard>();
    for (let cardsKey in cards) {
      let tempCard;
      if (cards.hasOwnProperty(cardsKey)) {
        let card = cards[cardsKey];
        tempCard = new KanbanCard(card.title, card.timeEstimate, card.content, card.id);
      }
      newKanbanCards.push(tempCard);
    }
    return newKanbanCards;
  }

  // CUD for BOARDS
  createBoard(boardName: string): KanbanBoard {
    const newBoard = new KanbanBoard(boardName);
    this.boards.push(newBoard);
    this.writeToDataBase();
    return newBoard;
  }

  editBoard(boardId: string, newTitle: string) {
    console.log("Index of Boards:");
    console.log(this.boardIndexForBoardId(boardId, this.boards));
    let indexOfBoardToBeEdited = this.boardIndexForBoardId(boardId, this.boards);
    this.boards[indexOfBoardToBeEdited].title = newTitle;

    this.writeToDataBase();
  }

  deleteBoard(boardId: string) {
    let indexOfBoardToBeDeleted = this.boardIndexForBoardId(boardId, this.boards);
    this.boards.splice(indexOfBoardToBeDeleted, 1);

    this.writeToDataBase();
  }

  // CUD for COLUMNS
  createColumn(boardId: string, columnName: string): KanbanColumn {
    console.log("createColumn()->boardIndex:");
    console.log(this.boardIndexForBoardId(boardId, this.boards));
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    const newColumn = new KanbanColumn(columnName);
    this.boards[boardIndex].columns.push(newColumn);

    this.writeToDataBase();

    return newColumn;
  }

  editColumn(boardId: string, idOfColumnToBeEdited: string, newTitle: string) {
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumnToBeEdited, this.boards[boardIndex].columns);
    this.boards[boardIndex].columns[columnIndex].title = newTitle;

    this.writeToDataBase();
  }

  deleteColumn(boardId: string, idOfColumnToBeDeleted: string) {
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumnToBeDeleted, this.boards[boardIndex].columns);
    this.boards[boardIndex].columns.splice(columnIndex, 1);

    this.writeToDataBase();
  }

  // CUD for CARDS
  createCard(boardId: string, idOfColumn: string, newCardTitle: string, timeEstimate: number, cardContent: string) {
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumn, this.boards[boardIndex].columns);
    const newCard = new KanbanCard(newCardTitle, timeEstimate, cardContent);
    this.boards[boardIndex].columns[columnIndex].cards.push(newCard);

    this.writeToDataBase();

    return newCard;
  }

  editCard(boardId: string, idOfColumn: string, idOfCard: string, newCardTitle: string, timeEstimate: number, cardContent: string) {

    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumn, this.boards[boardIndex].columns);
    let cardIndex = this.cardIndexForCardId(idOfCard, this.boards[boardIndex].columns[columnIndex].cards);

    this.boards[boardIndex].columns[columnIndex].cards[cardIndex] = new KanbanCard(newCardTitle, timeEstimate, cardContent);
    this.writeToDataBase();
  }

  deleteCard(boardId: string, idOfColumn: string, idOfCard: string) {
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumn, this.boards[boardIndex].columns);
    let cardIndex = this.cardIndexForCardId(idOfCard, this.boards[boardIndex].columns[columnIndex].cards);


    this.boards[boardIndex].columns[columnIndex].cards.splice(cardIndex, 1);
    this.writeToDataBase();
  }

  // Utility functions

  boardIndexForBoardId(boardId: string, boardList: Array<KanbanBoard>): number {
    let indexOfId = -1;
    boardList.forEach((value, index) => {
      if (value.id === boardId) {
        indexOfId = index;
      }
    });
    return indexOfId;
  }

  columnIndexForColumnId(columnId: string, columnList: Array<KanbanColumn>): number {
    let indexOfId = -1;
    columnList.forEach((value, index) => {
      if (value.id === columnId) {
        indexOfId = index;
      }
    });
    return indexOfId;
  }

  cardIndexForCardId(cardId: string, cardList: Array<KanbanCard>): number {
    let indexOfId = -1;
    cardList.forEach((value, index) => {
      if (value.id === cardId) {
        indexOfId = index;
      }
    });
    return indexOfId;
  }

  writeToDataBase() {
    this.afdb.object('/users/' + this.uid + '/boards').set(this.boards);
  }

  createTutorialBoard() {

    const tutorialBoard = this.createBoard("Tutorial");
    const backlogColumn = this.createColumn(tutorialBoard.id, "Backlog");

    this.createCard(tutorialBoard.id, backlogColumn.id,
      "Welcome to Kanban!",
      2,
      "A minimalist KanbanBoard manager.");

    this.createCard(tutorialBoard.id, backlogColumn.id,
      "What's that?",
      2,
      "Boards are organized into columns, whilst columns contain cards. This is a card!");

    this.createCard(tutorialBoard.id, backlogColumn.id,
      "What do cards consist of?",
      2,
      "Cards have a title, optional further content and a time estimate. They represent a task you want to complete."
    );

    this.createCard(tutorialBoard.id, backlogColumn.id,
      "Time estimate you say?",
      99,
      "The time estimate is vague on purpose. You choose whether a unit is one Pomodoro, one hour or one marsian day."
    );

    this.createCard(tutorialBoard.id, backlogColumn.id,
      "Cool! How do I use it?",
      2,
      "Swipe right to find out."
    );

    const inProgressColumn = this.createColumn(tutorialBoard.id, "In Progress");

    this.createCard(tutorialBoard.id, inProgressColumn.id,
      "How do I add items?",
      2,
      "You add items by using the big plus in the bottom right corner. You finish editing one line by pressing ENTER. Press ENTER on the last row to save your card / column / board."
    );
    this.createCard(tutorialBoard.id, inProgressColumn.id,
      "How do I edit items?",
      2,
      "You can edit items you see by long-pressing on them. Again, pressing ENTER jumps to the next field and finishes editing when in the last field. Try editing this card!"
    );
    this.createCard(tutorialBoard.id, inProgressColumn.id,
      "How do I reorder items?",
      2,
      "There's a little handle on the top right, press on it and drag the card (or other item like a column or board for that matter) to where you want it to be!"
    );
    this.createCard(tutorialBoard.id, inProgressColumn.id,
      "Okay great. But how can I edit columns?",
      2,
      "See that in the top right? This is the button that leads you to the screen for adding / deleting / reordering columns. Don't forget the long-press for editing!"
    );
    this.createCard(tutorialBoard.id, inProgressColumn.id,
      "Anything else?",
      2,
      "Swipe right."
    );

    const doneColumn = this.createColumn(tutorialBoard.id, "Done");

    this.createCard(tutorialBoard.id, doneColumn.id,
      "You're ready to rock and roll!",
      2,
      "Start off by going back and creating your very own first board."
    );

    this.createCard(tutorialBoard.id, doneColumn.id,
      "Keep me around... or don't.",
      2,
      "I suggest you keep the tutorial around for a bit until you get a hang of the tool. Feel free to delete it though if you're super comfortable already!"
    );

    this.createCard(tutorialBoard.id, doneColumn.id,
      "Go!",
      2,
      "Productivity is calling!"
    );

  }
}
