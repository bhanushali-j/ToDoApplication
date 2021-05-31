import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Page } from "../models/page";
import { Pageable } from "../models/pageable";
import { ToDoDto } from "../models/todo-dto";
import { ToDoInDto } from "../models/todo-in-dto";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class ToDoService {
  private baseURL = `${environment.apiUrl}/todos`;

  constructor(private http: HttpClient, private userService: UserService) {}

  getToDos(pageProperties: Pageable): Observable<Page<ToDoDto>> {
    const id = this.userService.getLoggedInUser();
    return this.http
      .get(this.baseURL, {
        params: {
          id: id,
          pageNo: String(pageProperties.pageNo),
          pageSize: String(pageProperties.pageSize),
        },
      })
      .pipe(catchError(this.handleError));
  }

  createTodo(toDo: ToDoInDto): Observable<object> {
    return this.http
      .post(this.baseURL, toDo)
      .pipe(catchError(this.handleError));
  }

  deleteTodo(id: number): Observable<object> {
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateTodo(toDo: ToDoDto): Observable<object> {
    return this.http.put(this.baseURL, toDo).pipe(catchError(this.handleError));
  }

  // error handling
  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error.message && typeof err.error.message === "string") {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
