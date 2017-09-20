import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form : FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService) {
    
    this.form = formBuilder.group({
      firstName:formBuilder.control([]),
      lastName:formBuilder.control([]),
      email:formBuilder.control([]),
      password:formBuilder.control([]),
    });
  }

  logout(){
    this.authService.logout();
  }

  submit(){
    const credentials = this.form.value;
    this.authService.register(credentials)
    .subscribe(response=>{
      if(!response.auth){
        console.error(response.message);
      }
      else{
        console.info('success register');
      }
    });
  }
}
