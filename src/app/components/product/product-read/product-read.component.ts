import { Component, OnInit } from '@angular/core';
import { BlingService } from '../../template/bling.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: any[]

  displayedColumns = ['id', 'codigo', 'preco', 'tipo', 'situacao', 'categoria', 'descricaoCurta']
  
  constructor(private blingService: BlingService) { }

  ngOnInit(): void {    
    // const authorizationCode = this.extractAuthorizationCodeFromUrl();
    // if (authorizationCode) {
    //   this.blingService.authenticateAndFetchProducts(authorizationCode)
    //     .subscribe((response: any) => {
    //       const accessToken = response.access_token;
    //       this.blingService.getProducts(accessToken)
    //         .subscribe((products: any) => {
    //           console.log(products);
              
    //           this.products = products.data; // Atualize a lista de produtos
    //         });
    //     });
    // } else {
    //   console.error('Authorization code not found in URL.');
    // }

    this.blingService.getProdutos().subscribe((response: any) => {
      this.products = response.retorno.produtos;
    });
  }
}




// import { ProductService } from '../product.service';
// import { Product } from '../product.model';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-product-read',
//   templateUrl: './product-read.component.html',
//   styleUrls: ['./product-read.component.css']
// })
// export class ProductReadComponent implements OnInit {

//   products: Product[]
//   displayedColumns = ['id', 'name', 'price', 'action']
  
//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.productService.read().subscribe(products => {
//       this.products = products
//     })
//   }

// }

