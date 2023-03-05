import { Component, OnInit } from '@angular/core';
import { TokenadminService } from '../../services/tokenadmin.service';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
  selector: 'enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.css']
})
export class EnterprisesComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  search:any = "";
  vacio:any = false;

  listado:any = [];
  total:any = 0;

  //paginacion
  totalPaginas:any = 0;
  currentPagina:any = 0;
  previous:any = true;
  next:any = true;

  constructor(
    private _tokenAdminService: TokenadminService,
    private _enterpriseService: EnterpriseService,
  ) { }

    data:any;

  ngOnInit(): void {
    this.token = this._tokenAdminService.cargarValoresLocalStorage();
    if(this.token != null){
      this.logged = true;
      this.currentPagina++;
      this.searchAll();
    }else{
      this.logged = false;
    }
  }

  searchText(){
    this.currentPagina = 1;
    this.searchAll();
  }

  searchAll(){
      this.loading = true;
      this._enterpriseService.findAll(this.search, 10, Number(this.currentPagina) - 1)
      .subscribe((resp: any) => {
        this.loading = false;
        this.listado = resp.lista;
        this.total = resp.conteo;
        this.initialConfig();
      });   
  }

  initialConfig(){
    this.totalPaginas = this.total / 10;
    this.totalPaginas = Math.ceil(this.totalPaginas);
    this.changuePage(3);
    if(this.total < 1){
      this.vacio = true;
    }else{
      this.vacio = false;
    }
  }

  actionChangue(op){
    this.changuePage(op);
    this.searchAll();
  }

  changuePage(op){
    if(op == 1){
      this.currentPagina++;
    }else if(op == 2){
      this.currentPagina--;
    }

    if(this.currentPagina < 2){
      this.previous = true;
    }else{
      this.previous = false;
    }

    if(this.currentPagina < this.totalPaginas){
      this.next = false;
    }else{
      this.next = true;
    }
  }
}
