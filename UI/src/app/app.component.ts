import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "UI";
  userExists = false;
  userEmail: string;
  userExists$;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userExists$ = this.userService.isLoggedIn();
  }

  logout() {
    this.userExists = false;
    this.userService.clearUser();
    this.router.navigate(["/login"]);
  }
}
