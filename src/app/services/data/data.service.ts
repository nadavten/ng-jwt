import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';


@Injectable()
export class DataService<T> {

  constructor(private url:string,private http:HttpClient) { }

  get(){
    return this.http.get<T>(this.url)
    .catch(this.handleError);
  }

  post(object:T){
    return this.http.post<T>(this.url,JSON.stringify(object))
    .catch(this.handleError);
  }

  update(id:any,object:T){
    return this.http.put<T>(this.url+'/'+id,JSON.stringify(object))
    .catch(this.handleError);
  }

  delete(id:any){
    return this.http.delete<T>(this.url+'/'+id)
    .catch(this.handleError);
  }

  private handleError(err){

    return Observable.throw(err);
  }

}
