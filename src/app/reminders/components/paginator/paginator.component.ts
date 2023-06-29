import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PaginatorItem } from '../../interfaces/teble-item.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input()
  public page:number = 1;

  @Input()
  public pageSize: number = 10;

  @Input()
  public numberOfPages!: number;

  @Input()
  public collectionSize: number = 0;

  @Output()
  public pageChange = new EventEmitter<number>();

  @Output()
  public onPageChange = new EventEmitter<number>();

  public paginatorPages: PaginatorItem[] = [];

  public showFirstElipsis: boolean = false;
  public showLastElipsis: boolean = false;

  ngOnInit(): void {
    this.pageSelected(1);
  }

  pageSelected(page: number): void {
    this.paginatorPages = [];
    const padPage = 2;

    this.paginatorPages.push({
      number: 1,
      type: 'number'
    });

    this.paginatorPages.push({
      number: -1,
      type: 'ellipsis',
      show: !((page - padPage) <= padPage)
    });
    
    for(let i = ((page - padPage) < 1 ? 2 : (page - padPage)); i <= (( page + padPage ) >= this.numberOfPages ? (this.numberOfPages - 1) : ( page + padPage )); i++) {
      // if(this.paginatorPages.find(p => p.number === i)){
      //   continue;
      // }
      this.paginatorPages.push({
        number: i,
        type: 'number'
      });
    }

    this.paginatorPages.push({
      number: -1,
      type: 'ellipsis',
      show: page < (this.numberOfPages - padPage - 1)
    });

    this.paginatorPages.push({
      number: this.numberOfPages,
      type: 'number'
    });
  }

  goToPage(page: number):void {
    this.page = page;

    this.pageChange.emit(this.page);

    this.onPageChange.emit(this.page);

    this.pageSelected(this.page);
  }
}
