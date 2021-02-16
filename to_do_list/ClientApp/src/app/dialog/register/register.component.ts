import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http-service.service';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  private submitting = false;
  private formError: string;
  private user: User = new User();
  private registering: boolean = false;
  private hasAdded: boolean = false;
  private status: any;
  private emailError: boolean = false;

  constructor(private router: Router, private httpServise: HttpService) { }

  ngOnInit() { }

  onSubmit(registerForm: NgForm): void {
    if (registerForm.valid) {
      this.submitting = true;
      this.formError = null;
      this.registering = true;
      this.user.email = registerForm.value.email;
      this.user.password = registerForm.value.password;
      this.user.name = registerForm.value.name;

      // User registration in the server database 
      this.httpServise.postNewUser(this.user).subscribe((respons) => {
        if (respons.status === 200) {
          this.submitting = true;
          this.formError = null;
          this.hasAdded = true;
          this.registering = false;
          this.router.navigate(['/authetincated'])
        }
      },
        (error) => {
          if (error.status === 409) {
            this.submitting = false;
            this.formError = "User with this Email already exsist";
            this.emailError = true;
            this.registering = false;
          }
          this.submitting = false;
        }
      );
    };
  }
}


