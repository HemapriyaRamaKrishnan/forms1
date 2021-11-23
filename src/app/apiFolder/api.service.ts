import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post('http://localhost:3000/posts', data);
  }
  getEmployee() {
    return this.http.get('http://localhost:3000/posts');
  }
  deleteEmployee(i: number) {
    return this.http.delete('http://localhost:3000/posts/' + i);
  }
  updateEmployee(data: any, i: number) {
    return this.http.put('http://localhost:3000/posts/' +i,data)
  }
}
