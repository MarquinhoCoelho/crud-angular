import { BlingService } from '../../template/bling.service';
import { Component, OnInit } from '@angular/core';
import * as colors from '../colors';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-pedidos-read',
  templateUrl: './pedidos-read.component.html',
  styleUrls: ['./pedidos-read.component.css']
})
export class PedidosReadComponent implements OnInit {

  products: any[];
  listColors = [];
  troca = false;
  teste: any;

  displayedColumns = ['numero', 'numeroOrdemCompra', 'nome', 'qtd', 'preco', 'situacao']

  displayedColumns2 = ['codigo', 'descricao', 'quantidade', 'un', 'valorunidade'];
  
  constructor(private blingService: BlingService) { 
  }

  ngOnInit(): void {    
    this.blingService.getPedidos().subscribe((response: any) => {
      console.log(response);
      
      this.products = response.retorno.pedidos;
    });
  }

  exportData() {
    this.troca = !this.troca;
    const listItens = [];
    for (const pedido2 of this.products) {
      for (const item of pedido2.pedido.itens) {
        if (item) {
          listItens.push(item);
        }
      }
    }
    
    console.log('listItens', listItens);
    
    const itemsByMiddleNumbers: { [key: string]: any[] } = {}; // Objeto para armazenar os itens pela parte central dos números
    for (const item of listItens) {
      const codigo = item.item.codigo;
      const firstDotIndex = codigo.indexOf('.');
      const secondDotIndex = codigo.indexOf('.', firstDotIndex + 1);
      if (firstDotIndex !== -1 && secondDotIndex !== -1 && secondDotIndex > firstDotIndex + 1) {
        const middleNumbers = codigo.substring(firstDotIndex + 1, secondDotIndex);
        if (!itemsByMiddleNumbers[middleNumbers]) {
          itemsByMiddleNumbers[middleNumbers] = []; // Cria uma lista vazia se não existir para a parte central dos números
        }
        itemsByMiddleNumbers[middleNumbers].push(item.item); // Adiciona o item à lista correspondente
      }
    }
    
    const list: { cor: string, lista: any[] }[] = [];
    for (const middleNumbers in itemsByMiddleNumbers) {
      const color = colors.default.find((c: any) => c.code === middleNumbers);
      if (color) {
        list.push({ cor: color.name, lista: itemsByMiddleNumbers[middleNumbers] });
      }
    }
    
    this.teste = list;
    console.log('list', list);
  }

  generateTitle(item: any) {
    console.log('item', item);
    
    // // console.log('colors', colors);
    // for (const cor of colors.default) {
    //   const firstDotIndex = item.code.indexOf('.');
    //   const secondDotIndex = item.code.indexOf('.', firstDotIndex + 1);
    //   const middleNumbers = item.code.substring(firstDotIndex + 1, secondDotIndex);
    //   if (cor.code == middleNumbers) {
    //     console.log(cor.name);
    //   }
    // }
    
    
    // return item.code;
  }
  
  private formatedData(itemsByMiddleNumbers: any) {
    for (const i in itemsByMiddleNumbers) {
      console.log('i', i);

      
      
    }
  }

  gerarPDF() {
    const documentDefinition = {
      content: [
        { text: 'Sua Tabela em PDF', style: 'header' },
        ...this.teste.flatMap(elemento => [
          { text: elemento.cor, style: 'corHeader' },
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
              body: [
                ['Código', 'Descrição', 'Quantidade', 'Unidade', 'Valor Unidade'],
                ...elemento.lista.map(item => [
                  item.codigo,
                  item.descricao,
                  item.quantidade.toString(),
                  item.un,
                  item.valorunidade.toString()
                ])
              ]
            }
          }
        ])
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        corHeader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] }
      }
    };
  
    pdfMake.createPdf(documentDefinition).download('sua-tabela1.pdf');
  }
  


  // meio mal
  // gerarPDF(){
  //   const docDefinition = {
  //     content: [
  //       {
  //         text: 'Relatório de Elementos',
  //         style: 'header',
  //         alignment: 'center',
  //         margin: [0, 0, 0, 20], // margem inferior de 20 unidades
  //       },
  //       {
  //         table: {
  //           headerRows: 1,
  //           widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
  //           body: [
  //             ['Código', 'Descrição', 'GTIN', 'Quantidade', 'Unidade', 'Valor Unidade'],
  //             ...this.teste.flatMap(elemento => elemento.lista.map(item => [
  //               item.codigo,
  //               item.descricao,
  //               item.gtin,
  //               item.quantidade,
  //               item.un,
  //               item.valorunidade
  //             ]))
  //           ],
  //         },
  //         layout: {
  //           fillColor: function (rowIndex, node, columnIndex) {
  //             return (rowIndex % 2 === 0) ? '#CCCCCC' : null; // Cor de fundo alternada para linhas pares
  //           }
  //         },
  //       }
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //       },
  //     },
  //   };
  
  //   pdfMake.createPdf(docDefinition).open(); // Abre o PDF em uma nova janela
  // }





  
  
  
  
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

