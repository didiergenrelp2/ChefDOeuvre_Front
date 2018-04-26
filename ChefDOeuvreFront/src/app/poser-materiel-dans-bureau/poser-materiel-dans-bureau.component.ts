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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Supprime les espaces
    filterValue = filterValue.toLowerCase(); // Met le MatTableDataSource en lowercase
    this.dataSourceMateriel.filter = filterValue;
  }
  
  @ViewChild(MatSort) sort: MatSort;

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
    // this.data = id_bureau du bureau sélectionné avant ouverture fenetre selection materiel
    this.materielService.poserMaterielDansBureau(this.materiel.id_materiel, this.data).subscribe(
      result=> {this.afficherMessage("Enregistrement effectué", "")},
      error => {this.afficherMessage("", "Matériel déjà présent dans le bureau")}
    )
  }
  
  afficherMessage(message:string, erreur: string){
    this.snackBar.open(message,erreur, {
      duration: 2000,
    });
  }

  rechercher(recherche: string) {
    this.materielService.rechercherMateriel(recherche).subscribe((data: Imateriel[]) => {
      this.dataSourceMateriel = new MatTableDataSource(data);
      this.dataSourceMateriel.sort = this.sort;
    });
  } 
}
