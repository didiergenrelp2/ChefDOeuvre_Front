import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Imateriel } from '../imateriel';
import { MaterielService } from '../materiel.service'; 

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {
  materiels:Imateriel[];
  materiel:Imateriel;
  selectedRowIndex: number= -1;
  edition:boolean=false;

  constructor(private materielService:MaterielService) { }

  displayedColumns = ['domaine', 'type', 'marque', 'modele', 'numero_serie', 'code_parc', 'code_article', 'date_fin_garantie'];
  dataSourceMateriel = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceMateriel.filter = filterValue;
  }
  //TODO mettre les valeurs avec des nombres ?
  fonctions = [
    {value: 'informatique', viewValue: 'Informatique'},
    {value: 'reseau', viewValue: 'Réseau'},
    {value: 'telephonie', viewValue: 'Téléphonie'},
    {value: 'automates', viewValue: 'Automates'},
    {value: 'surete', viewValue: 'Sureté'}
  ];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.clearInput();

    this.refreshTab();

    this.materielService.update$.subscribe(()=>this.refreshTab());
  }

  refreshTab(){
    this.materielService.recupererToutMateriel().subscribe((data: Imateriel[])=>{
      this.dataSourceMateriel=new MatTableDataSource(data);
      this.dataSourceMateriel.sort = this.sort;
    })
  }

  highlight(row){
    this.selectedRowIndex = row.id;
    console.log(row.id);
    this.edition=true;
    this.materiel=Object.assign({},row);
  }

  onSubmit(){
    if(this.edition){
      this.materielService.mettreAJourMateriel(this.materiel).subscribe();
    } else {
      this.materielService.ajouterMateriel(this.materiel).subscribe();
    }
  }

  cancelSelect(){
    this.selectedRowIndex=-1;
    this.edition=false;
    this.clearInput();
  }

  clearInput(){
    this.materiel={
      id_materiel:0,
      domaine:'',
      type:'',
      marque:'',
      modele:'',
      numero_serie:'',
      code_parc:'',
      code_article:'',
      date_fin_garantie:'',
      bureau:''

    }
  }

  supprimerMateriel(){
    this.edition=false;
    this.materielService.supprimerMateriel(this.materiel.id_materiel).subscribe();
    this.clearInput();
  }
  }