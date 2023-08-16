import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable, EMPTY, Observer } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "https://json-server-marcos.vercel.app";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: Product): Observable<Product> {
    return new Observable((observer: Observer<any>) => {
      this.http.post<Product>(this.baseUrl+'/products', product).subscribe(response => {
        observer.next(response);
        observer.complete();
      }, (error: any) => {
        if (error.status !== 500) {
          this.errorHandler(error);
        }
        observer.error(error);
        observer.complete();
      });
    });
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+'/products').pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/products/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/products/${product.id}`;

    return new Observable((observer: Observer<any>) => {
      this.http.put<Product>(url, product).subscribe(response => {
        observer.next(response);
        observer.complete();
      }, (error: any) => {
        if (error.status !== 500) {
          this.errorHandler(error);
        }
        observer.error(error);
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/products/${id}`;

    return new Observable((observer: Observer<any>) => {
      this.http.delete<Product>(url).subscribe(response => {
        observer.next(response);
        observer.complete();
      }, (error: any) => {
        if (error.status !== 500) {
          this.errorHandler(error);
        }
        observer.error(error);
        observer.complete();
      });
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
