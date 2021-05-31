import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { ToDoDialogComponent } from './toDo-dialog/todo-dialog.component';

@NgModule({
  declarations: [AppComponent, ToDoDialogComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [AuthGuardService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [ToDoDialogComponent],
})
export class AppModule {}
