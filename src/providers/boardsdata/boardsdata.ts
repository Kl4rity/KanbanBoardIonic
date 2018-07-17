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
    if (this.boards.length === 1){
      this.initializeLoadingBoardsFromStorage();
    }
  }

  reloadInCaseOfFirstColumnOnBoard(boardId:number){
    if(this.boards[boardId].columns.length === 1){
      this.initializeLoadingBoardsFromStorage();
    }
  }

  generateDummyData(){
    // this.boards.push(new KanbanBoard("FH Technikum"));
    
    // this.boards[0].addNewColumn("Backlog");
    //   this.boards[0].columns[0].addNewCard("Cross Platform Project", 20, "Work on the cross platform project.");
    //   this.boards[0].columns[0].addNewCard("Get used to Angular", 15, "What exactly is the difference between Angular 2 and 6?!");
    //   this.boards[0].columns[0].addNewCard("Finish Change Management Presentation", 5, "Meet with Fahri to work on the presentation.");
    //   this.boards[0].columns[0].addNewCard("React?", 0.5, "Should you be reading up on react or sticking with Angular for now?");
    //   this.boards[0].columns[0].addNewCard("Procrastination", 5, "Nice plans you have there? Wanna work on them? Too bad. You gotta procrastinate now.");
    //   this.boards[0].columns[0].addNewCard("CSR vs SSR", 8, "Is SSR even a thing nowadays?");
    //   this.boards[0].columns[0].addNewCard("Docker", 3, "What a beast. Deploy an app on your VPS using it.");

    // this.boards[0].addNewColumn("In Progress");
    //   this.boards[0].columns[1].addNewCard("Prototype CPP", 4, "Finish an easily extensible prototype of the CPP Project");
    //   this.boards[0].columns[1].addNewCard("Quorum Network", 8, "Make Nodes automatically connect to each other and expose ports to net for other machines to connect to it.");

    // this.boards[0].addNewColumn("Done");
    //   this.boards[0].columns[2].addNewCard("Setup Quorum", 15, "Get a simple Quorum Node network with Istanbul Consensus up and running.");
    //   this.boards[0].columns[2].addNewCard("Update AJAX", 6, "Finish update AJAX request for SemesterProject.");
    
    
    // this.boards.push(new KanbanBoard("Gaming"));

    //   this.boards[1].addNewColumn("To Play");
    //   this.boards[1].columns[0].addNewCard("Everspace", 20 , "Preferrably on a VR Setup!");
    //   this.boards[1].columns[0].addNewCard("Quake Champions", 6 , "Sounds and looks interesting. Give it a shot.");
    //   this.boards[1].columns[0].addNewCard("Fortnite", 10 , "Should at least try it! Get the Nintendo Switch Version installed.");

    //   this.boards[1].addNewColumn("Playing");
    //   this.boards[1].columns[1].addNewCard("Witcher 3", 70 , "Fix your setup, get proper Framerate and continue.");
    //   this.boards[1].columns[1].addNewCard("Titanfall II", 30 , "Get some more hours in before servers die out. Such a gread game. Love it.");
      
    //   this.boards[1].addNewColumn("Finished");
    //   this.boards[1].columns[2].addNewCard("Zelda Majora's Mask", 80, "Again anytime.");
  }

}
