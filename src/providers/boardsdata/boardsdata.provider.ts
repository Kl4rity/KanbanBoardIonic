import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { Storage } from '@ionic/storage';
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
    private storage: Storage,
    private afdb:AngularFireDatabase,
    private auth:AuthProvider
    ) {
    // this.initializeLoadingBoardsFromStorage();
    this.fetchFireBaseData();
  }


  // Workflow for building model from data pushed by FireBase;
  fetchFireBaseData(){
    this.auth.user.subscribe((user)=>{

      this.boards$ = new BehaviorSubject<KanbanBoard[]>(null);

      this.boards$.subscribe((boards)=>{
        if(boards == null){
          this.boards = new Array<KanbanBoard>();
        }
        this.boards = boards;
      });

      if(user !== null && user.uid){
        // this.afdb.object('/users/'+ user.uid + '/boards').valueChanges().map((boards:Object)=>{
          this.afdb.object('/users/'+ user.uid +'/boards').valueChanges().map((boards:Object)=>{
          this.uid = user.uid;
          if(boards == null){
            this.boards$.next(new Array<KanbanBoard>());
          }
          
          let newKanbanBoards:Array<KanbanBoard> = [];
          for(let key in boards){
            let tempBoard;
            if(boards.hasOwnProperty(key)){
              let board = boards[key];
              tempBoard = new KanbanBoard(board.title, board.id);
              tempBoard.columns = this.buildColumns(board.columns);
              newKanbanBoards.push(tempBoard);
            };
          };
          return newKanbanBoards;
        }).subscribe((kanbanBoards)=>{
          this.boards$.next(kanbanBoards);
        });
      }
    });
  }

  buildColumns(columns:Object): Array<KanbanColumn>{
    let newKanbanColumns = new Array<KanbanColumn>();
    for(let columnKey in columns){
      let tempColumn;
      if(columns.hasOwnProperty(columnKey)){
        let column = columns[columnKey];
        tempColumn = new KanbanColumn(column.title, column.id);
        tempColumn.cards = this.buildCards(column.cards);
      }
      newKanbanColumns.push(tempColumn);
    }
    return newKanbanColumns;
  }

  buildCards(cards:Object):Array<KanbanCard>{
    let newKanbanCards = new Array<KanbanCard>();
    for(let cardsKey in cards){
      let tempCard;
      if(cards.hasOwnProperty(cardsKey)){
        let card = cards[cardsKey];
        tempCard = new KanbanCard(card.title, card.timeEstimate, card.content, card.id);
      }
      newKanbanCards.push(tempCard);
    }
    return newKanbanCards;
  }

  // CUD for BOARDS
  createBoard(boardName : string){
    this.boards.push(new KanbanBoard(boardName));
    this.writeToDataBase();
  }

  editBoard(boardId: string, newTitle: string){
    console.log("Index of Boards:");
    console.log(this.boardIndexForBoardId(boardId, this.boards));
    let indexOfBoardToBeEdited = this.boardIndexForBoardId(boardId, this.boards);
    this.boards[indexOfBoardToBeEdited].title = newTitle;

    this.writeToDataBase();
  }

  deleteBoard(boardId: string){
    let indexOfBoardToBeDeleted = this.boardIndexForBoardId(boardId, this.boards);
    this.boards.splice(indexOfBoardToBeDeleted, 1);

    this.writeToDataBase();
  }

  // CUD for COLUMNS
  createColumn(boardId: string, columnName: string){
    console.log("createColumn()->boardIndex:");
    console.log(this.boardIndexForBoardId(boardId, this.boards));
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    this.boards[boardIndex].addNewColumn(columnName);

    this.writeToDataBase();
  }

  editColumn(boardId: string, idOfColumnToBeEdited: string, newTitle: string){
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumnToBeEdited, this.boards[boardIndex].columns);
    this.boards[boardIndex].columns[columnIndex].title = newTitle;

    this.writeToDataBase();
  }

  deleteColumn(boardId: string, idOfColumnToBeDeleted: string){
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumnToBeDeleted, this.boards[boardIndex].columns);
    this.boards[boardIndex].columns.splice(columnIndex, 1);

    this.writeToDataBase();
  }

  // CUD for CARDS
  createCard(boardId: string, idOfColumn: string, newCardTitle: string, timeEstimate: number, cardContent: string){
    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumn, this.boards[boardIndex].columns);
    this.boards[boardIndex].columns[columnIndex].addNewCard(newCardTitle, timeEstimate, cardContent);

    this.writeToDataBase();
  }

  editCard(boardId: string, idOfColumn: string, idOfCard: string, newCardTitle: string, timeEstimate: number, cardContent: string){

    let boardIndex = this.boardIndexForBoardId(boardId, this.boards);
    let columnIndex = this.columnIndexForColumnId(idOfColumn, this.boards[boardIndex].columns);
    let cardIndex = this.cardIndexForCardId(idOfCard, this.boards[boardIndex].columns[columnIndex].cards);

    this.boards[boardIndex].columns[columnIndex].cards[cardIndex] = new KanbanCard(newCardTitle ,timeEstimate, cardContent);
    this.writeToDataBase();
  }

  deleteCard(boardId: string, idOfColumn: string, idOfCard: string){
    let boardIndex;

    this.boards.forEach((value, index)=>{
      if(value.id === boardId){
        boardIndex = index;
      } else {
        boardIndex = -1;
      }
    });

    let columnIndex;
    
    this.boards[boardIndex].columns.forEach((value, index)=>{
      if(value.id === idOfColumn){
        columnIndex = index;
      }else{
        columnIndex = -1;
      }
    });

    let cardIndex;
    this.boards[boardIndex].columns[columnIndex].cards.forEach((value, index)=>{
      if(value.id === idOfCard){
        cardIndex = index;
      }else{
        cardIndex = -1;
      }
    });

    this.boards[boardIndex].columns[columnIndex].cards.splice(cardIndex, 1);
    this.writeToDataBase();
  }

  // Utility functions

  boardIndexForBoardId(boardId: string, boardList: Array<KanbanBoard>):number{
    let indexOfId = -1;
    boardList.forEach((value, index)=>{
      if(value.id === boardId){
        indexOfId = index;
      }});
      return indexOfId;
  }

  columnIndexForColumnId(columnId: string, columnList: Array<KanbanColumn>):number{
    let indexOfId = -1;
    columnList.forEach((value, index)=>{
      if(value.id === columnId){
        indexOfId = index;
      }
    });
    return indexOfId;
  }

  cardIndexForCardId(cardId: string, cardList: Array<KanbanCard>):number{
    let indexOfId = -1;
    cardList.forEach((value, index)=>{
      if(value.id === cardId){
        indexOfId = index;
      }
    });
    return indexOfId;
  }

  writeToDataBase(){
    this.afdb.object('/users/'+ this.uid +'/boards').set(this.boards);
  }
}
