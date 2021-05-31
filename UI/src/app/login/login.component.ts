import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { UserService } from "src/app/services/user.service";
import { UserDto } from "../models/user-dto";
import { UserInDto } from "../models/user-in-dto.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  credentials: UserInDto = {
    username: "",
    password: "",
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // implement login
  login() {
    this.userService
      .login(this.credentials)
      .pipe(catchError(this.handleError))
      .subscribe((res: UserDto) => {
        // console.log(res)
        localStorage.setItem("id", String(res.id));
        this.router.navigate(["/home"]);
        this.userService.setUser();
      });
  }

  // handle error from server
  handleError = (err: string) => {
    this.openSnackBar(err, "Error");
    return throwError(err);
  };

  // display snack bar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }
}
