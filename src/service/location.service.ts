import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Location } from '../Models/location';



@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiUrl="https://docker-zkbk.onrender.com/Location";
  list_location=new BehaviorSubject<Location[]>([]);
  data$: Observable<Location[]> = this.list_location.asObservable(); 
  constructor(private http:HttpClient) {   this.get_location();}
  get_location(){
     this.http.get<Location[]>(this.apiUrl).pipe(
    
     ).subscribe(data => {
      this.list_location.next(data);
    });
  }
  delete_location(id:Number):Observable<void>{
    return this.http.request<void>('DELETE', this.apiUrl+"DeleteLocation", {
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' }
    }).pipe( 
       map(() => {
        this.get_location()
    })
    )};
    add_location(Name:string):Observable<void>{
      const headers = new HttpHeaders({
        "Content-Type": "application/json"
      });
  
      
      
  return this.http.post<any>(this.apiUrl+"PostLocation", `\"${Name}\"`, { headers }).pipe( 
    map(() => {
     this.get_location()
 })
 );};

edite_location(object_location:Location):Observable<void>{


 return this.http.request<void>('PUT', this.apiUrl+"PutLocation", {
  body: JSON.stringify({ Id: object_location.id ,name_Location:object_location.name_Location}),
  headers: { 'Content-Type': 'application/json' }
}).pipe( 
  map(() => {
   this.get_location()
})
);}
}
