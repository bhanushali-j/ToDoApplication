import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Action } from "../models/action";
import { ToDoDialogData } from "../models/toDo-Dialog-Data";
import { ToDoDto } from "../models/todo-dto";

@Component({
  selector: "app-toDo-dialog",
  templateUrl: "./toDo-dialog.component.html",
})
export class ToDoDialogComponent implements OnInit {
  action = Action.CREATE;
  Action = Action;
  description: string;

  constructor(
    private dialogRef: MatDialogRef<ToDoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDoDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.action) {
      this.action = this.data.action;
    }

    if (this.data.description != null) {
      this.description = this.data.description;
    }
  }

  onUpdate(): void {
    this.dialogRef.close(this.compileData());
  }

  private compileData(): ToDoDto {
    return {
      id: this.data.id,
      description: this.description,
    } as ToDoDto;
  }
}
