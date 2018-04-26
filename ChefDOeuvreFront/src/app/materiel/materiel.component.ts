import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Imateriel } from '../imateriel';
import { MaterielService } from '../materiel.service';
import { FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {
  materiels: Imateriel[];
  materiel: Imateriel;
  selectedRowIndex: number = -1;
  edition: boolean = false;
  formatDate = new FormControl('', [Validators.pattern("^[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$")]);
  formatArticle = new FormControl('', [Validators.pattern("^[0-9]{6}$")]);
  formatParc = new FormControl('',[Validators.pattern("^[A-Z][0-9]{5}")]);

  constructor(
    private materielService: MaterielService,
    private snackBar:MatSnackBar
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
  
  domaines = [
    { value: 'Informatique', viewValue: 'Informatique' },
    { value: 'Réseau', viewValue: 'Réseau' },
    { value: 'Téléphonie', viewValue: 'Téléphonie' },
    { value: 'Automates', viewValue: 'Automates' },
    { value: 'Sureté', viewValue: 'Sureté' }
  ];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.clearInput();

    this.refreshTab();

    this.materielService.update$.subscribe(() => this.refreshTab());
  }

  refreshTab() {
    this.materielService.recupererToutMateriel().subscribe((data: Imateriel[]) => {
      this.dataSourceMateriel = new MatTableDataSource(data);
      this.dataSourceMateriel.sort = this.sort;
    })
  }

  highlight(row) {
    this.selectedRowIndex = row.id_materiel;
    this.materiel = Object.assign({}, row);
    this.edition = true;
  }

  onSubmit() {
    if (this.edition) {
      this.materielService.mettreAJourMateriel(this.materiel).subscribe(
        result=> {this.afficherMessage('Enregistrement effectué', '')},
        error => {this.afficherMessage('', 'Code parc déjà existant'); });
    } else {
      this.materielService.ajouterMateriel(this.materiel).subscribe(
        result=> {this.afficherMessage('Enregistrement effectué', '')},
        error => {this.afficherMessage('', 'Code parc déjà existant'); });
    }
  }

  afficherMessage(message:string, erreur: string){
    this.snackBar.open(message,erreur, {
      duration: 2000,
    });
   }

  cancelSelect() {
    this.selectedRowIndex = -1;
    this.edition = false;
    this.clearInput();
  }

  clearInput() {
    this.materiel = {
      id_materiel: 0,
      domaine: '',
      type: '',
      marque: '',
      modele: '',
      numero_serie: '',
      code_parc: '',
      code_article: '',
      date_fin_garantie: '',
      id_bureau: 0

    }
  }

  supprimerMateriel() {
    this.edition = false;
    this.materielService.supprimerMateriel(this.materiel.id_materiel).subscribe();
    this.clearInput();
  }
}