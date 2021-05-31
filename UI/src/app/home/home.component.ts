import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatTableDataSource,
} from "@angular/material";
import { of } from "rxjs";
import { filter, switchMap, tap } from "rxjs/operators";
import { Action } from "../models/action";
import { Pageable } from "../models/pageable";
import { ToDoDialogData } from "../models/toDo-Dialog-Data";
import { ToDoDto } from "../models/todo-dto";
import { ToDoInDto } from "../models/todo-in-dto";
import { ToDoService } from "../services/todo.service";
import { UserService } from "../services/user.service";
import { ToDoDialogComponent } from "../toDo-dialog/todo-dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  pageProperties: Pageable = { pageNo: 0, pageSize: 5, totalElements: 0 };
  displayedColumns: string[] = ["sr.no", "description", "actions"];
  toDoDataSource: MatTableDataSource<ToDoDto>;
  private toDos: ToDoDto[];
  loading: boolean;
  isError: boolean;
  toDoDetails: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private toDoService: ToDoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.toDoService.getToDos(this.pageProperties).subscribe((toDos) => {
      this.pageProperties = {
        pageNo: toDos.number,
        pageSize: toDos.size,
        totalElements: toDos.totalElements,
      };
      this.toDos = toDos.content;
      this.toDoDataSource = new MatTableDataSource(this.toDos);
    });
  }

  onUpdate(element: ToDoDto) {
    const dialogData: ToDoDialogData = {
      id: element.id,
      description: element.description,
      action: Action.UPDATE,
    };
    console.log(dialogData);

    const dialogRef = this.dialog.open(ToDoDialogComponent, {
      data: dialogData,
      width: "250px",
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        tap(console.log),
        switchMap((data) => this.toDoService.updateTodo(data))
      )
      .subscribe((_) => this.getAllTodos());
  }

  handleError = (err: string) => {
    this.loading = false;
    this.isError = true;
    this.paginator.disabled = true;
    this.openSnackBar(err, "Error");
    return of([]);
  };

  // display snack bar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  onSave() {
    if (this.toDoDetails.trim().length > 0) {
      const todoInDto: ToDoInDto = {
        userId: +this.userService.getLoggedInUser(),
        description: this.toDoDetails,
      };
      console.log(todoInDto);
      this.toDoService.createTodo(todoInDto).subscribe((toDoDto) => {
        console.log(toDoDto);
        this.getAllTodos();
        this.toDoDetails = "";
      });
    }
  }

  onDelete(id: number) {
    console.log(id);
    this.toDoService.deleteTodo(+id).subscribe(() => this.getAllTodos());
  }
  getPageDetails(event) {
    this.pageProperties = {
      pageNo: event.pageIndex,
      pageSize: event.pageSize,
      totalElements: event.length,
    };
    this.getAllTodos();
  }

  ngOnDestroy() {}
}
