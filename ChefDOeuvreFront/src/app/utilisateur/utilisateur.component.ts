import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
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

  constructor(private utilisateurService:UtilisateurService,private snackBar:MatSnackBar) { }

  displayedColumns = ['nom', 'prenom', 'idrh', 'fonction'];
  dataSourceUtilisateur = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceUtilisateur.filter = filterValue;
  }

  fonctions = [
    {value: '0', viewValue: 'Administrateur'},
    {value: '1', viewValue: 'Chef de Projet'},
    {value: '2', viewValue: 'Magasinier'},
    {value: '3', viewValue: 'Technicien'}
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
    this.selectedRowIndex = row.id_utilisateur;
    this.utilisateur=Object.assign({},row);
    this.edition=true;
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
      id_utilisateur:0,
      nom:'',
      prenom:'',
      idrh:'',
      mdp:'',
      fonction:''
    }
  }

  afficherMessage(message:string, erreur: string){
    this.snackBar.open(message,erreur, {
      duration: 2000,
    });
   }

  supprimerUtilisateur(){
    if( confirm("Supprimer définitivement l'utilisateur' ?")) {
    this.edition=false;
    this.utilisateurService.supprimerUtilisateur(this.utilisateur.id_utilisateur).subscribe(
      result=> {this.afficherMessage('Suppression effectuée', '')},
    );
    this.clearInput();
  }
  else {
    this.afficherMessage('', 'Suppression annulée');
   }}
}
