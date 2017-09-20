import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form : FormGroup;
  
    constructor(private formBuilder:FormBuilder,
      private authService:AuthService,
    private router:Router) {
      
      this.form = formBuilder.group({
        email:formBuilder.control('',[Validators.required]),
        password:formBuilder.control('',[Validators.required]),
      });
    }

    get email(){
      return this.form.get('email');
    }

    get password(){
      return this.form.get('password');
    }

    get emailRequired(){
      return this.email.invalid && (this.email.touched || this.email.dirty) && this.email.errors.required;
    }


    get passwordRequired(){
      return this.password.invalid && (this.password.touched || this.password.dirty) && this.password.errors.required;
    }
  
    submit(){
      
      this.authService.logout();

      const credentials = this.form.value;

      this.authService.login(credentials)
      .subscribe(
        response=>{
          if(!response.auth){
            console.info(response.message);
          }
          else{
            this.router.navigate(['home']);
          }
        },
        err=>{
            console.log(err.error);
        });
    }


}
