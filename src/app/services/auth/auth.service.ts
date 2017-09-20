import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders ,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/catch';

interface AuthResponse{
  auth:boolean;
  token:string;
  message:string;
}

@Injectable()
export class AuthService {

  private headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient,private router:Router) { }

  register(credentails){

    return this.http.post<AuthResponse>('/api/auth/register',JSON.stringify(credentails),{headers:this.headers})
      .do(response=>{
        
        if(response.auth && response.token){
          localStorage['token'] = response.token;
        }

      })
      .catch(this.handleError);
  }

  login(credentials){
    
    return this.http.post<AuthResponse>('/api/auth/login',JSON.stringify(credentials),{headers:this.headers})
      .do(response=>{
        if(response.auth && response.token){
          localStorage['token'] = response.token;
        }
      })
      .catch(this.handleError);
  }

  logout(){

    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  private handleError(err){

    const error = JSON.parse(err.error);
    alert(error.message);

    return Observable.throw(err);
  }

  get isLoggedIn(){
    
    return tokenNotExpired();
  }
}
