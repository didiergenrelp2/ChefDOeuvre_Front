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
  selector: 'app-poser-materiel-dans-bureau',
  templateUrl: './poser-materiel-dans-bureau.component.html',
  styleUrls: ['./poser-materiel-dans-bureau.component.css']
})
export class PoserMaterielDansBureauComponent implements OnInit {

  materiel: Imateriel;
  materiels: Imateriel[];
  bureau: Ibureau;
  selectionMateriel: boolean;
  selectedRowIndex: number = -1;

  constructor(
    private snackBar: MatSnackBar,
    private bureauService: BureauService,
    private materielService: MaterielService,
    public dialogRef: MatDialogRef<PoserMaterielDansBureauComponent>,
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

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceMateriel.filter = filterValue;
  }

  ngOnInit() {
    this.bureauService.recupererBureau(this.data).subscribe(bureau=>this.bureau = bureau);
  }

  highlight(row) {
    this.selectedRowIndex = row.id_materiel;
    this.materiel = Object.assign({}, row);
    this.selectionMateriel = true;
  }

  closeDial() {
    this.dialogRef.close();
  }

  //TODO Vérifier formule et corriger erreur 403 lors de la pose
  poserMaterielDansBureau(){
    this.selectionMateriel = false;
    this.selectedRowIndex=-1;
    let id_bureau = this.bureau.id_bureau;
    
    this.materielService.poserMaterielDansBureau(this.materiel).subscribe(
      result=> {this.afficherMessage("Enregistrement effectué", "")},
      error => {this.afficherMessage("", "Matériel déjà présent dans le bureau")}
    )
  }
  
  afficherMessage(message:string, erreur: string){
    this.snackBar.open(message,erreur, {
      duration: 2000,
    });
  }

  //TODO corriger erreur 500 lors de la recherche avec caractere
  rechercher(recherche) {
    this.materielService.rechercherMateriel(recherche).subscribe((data: Imateriel[]) => {
      this.dataSourceMateriel = new MatTableDataSource(data);
      this.dataSourceMateriel.sort = this.sort;
    });
  } 
}
