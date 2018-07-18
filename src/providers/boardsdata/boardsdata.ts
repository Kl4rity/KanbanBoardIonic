import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { Storage } from '@ionic/storage';
import { KanbanCard } from '../../models/KanbanCard.model';

@Injectable()
export class BoardsdataProvider {

  public boards: Array<KanbanBoard> = [];

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello BoardsdataProvider Provider');
    this.initializeLoadingBoardsFromStorage();
  }

  
  initializeLoadingBoardsFromStorage(){
    this.storage.get("boards").then((boards)=>{
      console.log(boards);
      if (boards == null){
        this.boards = new Array<KanbanBoard>();
      } else {
        this.readBoardsFromDataBase(JSON.parse(boards));
      }
    });
  }
  
  readBoardsFromDataBase(boards){
    boards.forEach((board, boardIndex)=>{
      this.readBoardFromDataBase(board, boardIndex);
    });
  }

  readBoardFromDataBase(board, boardIndex){
    this.boards.push(new KanbanBoard(board.title));
      if(board.columns == null){
        console.log("No columns for board " + board.title);
      } else {
        board.columns.forEach((column, columnIndex)=>{
          this.readColumnFromDataBase(column, boardIndex, columnIndex);
      });
    }
  }

  readColumnFromDataBase(column, boardIndex, columnIndex){

    this.boards[boardIndex].addNewColumn(column.title);

    if(column.cards == null){

    } else {
      column.cards.forEach((card)=>{
        this.readCardFromDataBase(boardIndex, columnIndex, card.title, card.content, card.timeEstimate);
      });
    }
  }

  readCardFromDataBase(boardIndex, columnIndex, cardTitle, cardContent, cardTime){
    this.boards[boardIndex].columns[columnIndex].addNewCard(cardTitle, cardTime, cardContent);
  }

  getBoards(){
    return this.boards;
  }

  createBoard(boardName : string){
    this.boards.push(new KanbanBoard(boardName));
    this.writeToDataBase();
    this.reloadInCaseOfFirstBoard();
  }

  createColumn(boardId: number, columnName: string){
    this.boards[boardId].addNewColumn(columnName);
    this.writeToDataBase();
    this.reloadInCaseOfFirstColumnOnBoard(boardId);
  }

  createCard(boardId: number, columnNumber: number, newCardTitle: string, timeEstimate: number, cardContent: string){
    this.boards[boardId].columns[columnNumber].addNewCard(newCardTitle, timeEstimate, cardContent);
    this.writeToDataBase();
  }

  editCard(boardId: number, columnNumber: number, currentCard: KanbanCard, newCardTitle: string, timeEstimate: number, cardContent: string){
    let indexOfOldCard = this.boards[boardId].columns[columnNumber].cards.indexOf(currentCard);
    this.boards[boardId].columns[columnNumber].cards[indexOfOldCard] = new KanbanCard(newCardTitle ,timeEstimate, cardContent);
    this.writeToDataBase();
  }

  deleteCard(boardId: number, columnNumber: number, cardToBeDeleted: KanbanCard){
    let indexOfCard = this.boards[boardId].columns[columnNumber].cards.indexOf(cardToBeDeleted);
    this.boards[boardId].columns[columnNumber].cards.splice(indexOfCard, 1);
    this.writeToDataBase();
  }

  writeToDataBase(){
    this.storage.set("boards", JSON.stringify(this.boards));
  }

  reloadInCaseOfFirstBoard(){
    // if (this.boards.length === 1){
    //   this.initializeLoadingBoardsFromStorage();
    // }
  }

  reloadInCaseOfFirstColumnOnBoard(boardId:number){
    // if(this.boards[boardId].columns.length === 1){
    //   this.initializeLoadingBoardsFromStorage();
    // }
  }
}
