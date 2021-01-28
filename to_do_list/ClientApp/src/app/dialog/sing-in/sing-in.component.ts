import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http-service.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})

export class SingInComponent implements OnInit {

  private user: User = new User;
  private submitting: boolean = false;
  private formError: string;
  private isAuthenticated: boolean = false;
  private invalidLogin: boolean = false;
  public showButtons: boolean = true;

  constructor(
    private httpService: HttpService,
    private dataService: DataService) { };

  ngOnInit() { }

  private onSignIn(singInForm: NgForm): void {
    if (singInForm.valid) {
      this.showButtons = false;
      this.submitting = true;
      this.formError = null;
      this.user.email = singInForm.value.email;
      this.user.password = singInForm.value.password;

      this.httpService.postAuthUser(this.user).subscribe((response) => {
        const token = (<any>response.body).token;
        const userId = (<any>response.body).user.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("jwt", token);
        this.invalidLogin = true;
        this.isAuthenticated = true;
        this.dataService.updateUserData();
      }, (error) => {
        this.formError = "Неверный Email или Password";
        this.isAuthenticated = false;
        this.invalidLogin = false
        this.showButtons = true;
      })
    }
  }
}


