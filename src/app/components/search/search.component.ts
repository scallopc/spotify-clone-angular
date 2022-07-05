import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  pesquisasRecentes = [
    'Top Brasil', 'Top Global', 'Esquenta Sertanejo',
    'Funk Hits', 'Pagodeira'
  ]

  inputSearch = '';

  constructor() { }

  ngOnInit(): void {
  }

  setSearch(search: string){
    this.inputSearch = search;
  }

  search(){
    console.log('Buscando...', this.inputSearch);
  }

}
