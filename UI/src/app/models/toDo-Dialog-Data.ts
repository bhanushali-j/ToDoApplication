import { Action } from "../models/action";

export interface ToDoDialogData {
  id?: number;
  description?: string;
  action: Action;
}
