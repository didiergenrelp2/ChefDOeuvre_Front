import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Iutilisateur } from '../iutilisateur';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  utilisateurs:Iutilisateur[];
  utilisateur:Iutilisateur;
  selectedRowIndex: number= -1;
  edition:boolean=false;

  constructor(private utilisateurService:UtilisateurService) { }

  displayedColumns = ['nom', 'prenom', 'idrh', 'fonction'];
  dataSourceUtilisateur = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceUtilisateur.filter = filterValue;
  }
//TODO mettre les valeurs avec des nombres ?
  fonctions = [
    {value: 'ADMIN', viewValue: 'Administrateur'},
    {value: 'CHEFPROJET', viewValue: 'Chef de Projet'},
    {value: 'MAGASINIER', viewValue: 'Magasinier'},
    {value: 'TECHNICIEN', viewValue: 'technicien'}
  ];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.clearInput();

    this.refreshTab();

    this.utilisateurService.updateUtilisateur$.subscribe(()=>this.refreshTab());
  }

  refreshTab(){
    this.utilisateurService.recupererTousLesUtilisateurs().subscribe((data: Iutilisateur[])=>{
      this.dataSourceUtilisateur=new MatTableDataSource(data);
      this.dataSourceUtilisateur.sort = this.sort;
    })
  }

  highlight(row){
    this.selectedRowIndex = row.id;
    console.log(row.id);
    this.edition=true;
    this.utilisateur=Object.assign({},row);
  }

  onSubmit(){
    if(this.edition){
      this.utilisateurService.mettreAJourUtilisateur(this.utilisateur).subscribe();
    } else {
      this.utilisateurService.ajouterUtilisateur(this.utilisateur).subscribe();
    }
  }

  cancelSelect(){
    this.selectedRowIndex=-1;
    this.edition=false;
    this.clearInput();
  }

  clearInput(){
    this.utilisateur={
      id:0,
      nom:'',
      prenom:'',
      idrh:'',
      mdp:'',
      fonction:''
    }
  }

  supprimerUtilisateur(){
    this.edition=false;
    this.utilisateurService.supprimerUtilisateur(this.utilisateur.id).subscribe();
    this.clearInput();
  }
}
