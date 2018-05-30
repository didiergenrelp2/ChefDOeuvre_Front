import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatSort,
  MatSnackBar
} from '@angular/material';

import { Imateriel } from '../imateriel';
import { MaterielService } from '../materiel.service';
import { Ibureau } from '../ibureau';
import { BureauService } from '../bureau.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-lister-materiel-du-bureau',
  templateUrl: './lister-materiel-du-bureau.component.html',
  styleUrls: ['./lister-materiel-du-bureau.component.css']
})
export class ListerMaterielDuBureauComponent implements OnInit {

  materiel: Imateriel;
  materiels: Imateriel[];
  bureau: Ibureau;
  selectionMateriel: boolean;
  selectedRowIndex: number = -1;

  constructor(
    private snackBar: MatSnackBar,
    private bureauService: BureauService,
    private materielService: MaterielService,
    public dialogRef: MatDialogRef<ListerMaterielDuBureauComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  displayedColumns = [
    'domaine',
    'type',
    'marque',
    'modele',
    'numero_serie',
    'code_parc',
    'code_article',
    'date_fin_garantie'
  ];
  dataSourceMateriel = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Supprime les espaces
    filterValue = filterValue.toLowerCase(); // Met le MatTableDataSource en lowercase
    this.dataSourceMateriel.filter = filterValue;
  }
  
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.bureau = {
      id_bureau: null,
      nom_bureau: '',
      code_regate: '',
      adresse: '',
      code_postal: '',
      ville: '',
      telephone: '',
      materiel: []
    };
    this.materiels=[];
    this.bureauService.recupererBureau(this.data).subscribe(bureau=>this.bureau = bureau);
    this.rafraichirListe();
  }

  rafraichirListe() {
    this.materielService.listerMaterielDuBureau(this.data).subscribe(materiels=> {
      this.materiels=materiels;
      this.dataSourceMateriel = new MatTableDataSource(this.materiels);
      this.dataSourceMateriel.sort = this.sort;
    })
  }

  highlight(row) {
    this.selectedRowIndex = row.id_materiel;
    this.materiel = Object.assign({}, row);
    this.selectionMateriel = true;
  }

  closeDial() {
    this.dialogRef.close();
  }

retirerMaterielDuBureau(){
  this.selectionMateriel = false;
  this.selectedRowIndex=-1; 
  this.materielService.retirerMaterielDuBureau(this.data, this.materiel.id_materiel).subscribe(
    result=> {
      this.rafraichirListe();
      this.afficherMessage("Suppression effectuée", "")
    },
    error => {this.afficherMessage("", "Matériel non présent dans le bureau")}
  );
}

afficherMessage(message:string, erreur: string){
  this.snackBar.open(message,erreur, {
    duration: 2000,
  });
}
nonNull(){
  if (this.materiels.length>0){
    return true
  }
  else{return false}
}

}
