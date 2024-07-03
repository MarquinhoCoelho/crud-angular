import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlingService {
  // private apiUrl = 'http://localhost:3000/api/pedidos'; // URL do servidor intermediário

  private apiUrl = 'http://127.0.0.1:8000/resimetal/api/v1'
  constructor(private http: HttpClient) { }

  getProdutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }


  getPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales_orders`);
  }
}
