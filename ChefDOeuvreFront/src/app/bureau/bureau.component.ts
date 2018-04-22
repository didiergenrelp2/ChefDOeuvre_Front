import { Component, OnInit, ViewChild } from '@angular/core';
import { Ibureau } from '../ibureau'
import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig,
  MatSort
} from '@angular/material';

import { BureauService } from '../bureau.service';
import { MaterielService } from '../materiel.service';
import { Imateriel } from '../imateriel';
import { PoserMaterielDansBureauComponent } from '../poser-materiel-dans-bureau/poser-materiel-dans-bureau.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bureau',
  templateUrl: './bureau.component.html',
  styleUrls: ['./bureau.component.css']
})
export class BureauComponent implements OnInit {
  bureau: Ibureau;
  materiel: Imateriel[];
  selectedRowIndex = -1;
  selectionBureau = false;

  constructor(
    private bureauService: BureauService,
    public dialog: MatDialog
  ) { }

  displayedColumns = [
    'nom',
    'code_regate',
    'adresse',
    'code_postal',
    'ville',
    'telephone'
  ];
  dataSourceBureau = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceBureau.filter = filterValue;
  }

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
    this.refreshTab();

    //this.bureauService.update$.subscribe(() => this.refreshTab());
  }

  refreshTab() {
    this.bureauService
      .recupererBureaux()
      .subscribe((data: Ibureau[]) => {
        this.dataSourceBureau = new MatTableDataSource(data);
        this.dataSourceBureau.sort = this.sort;
      });
  }
  highlight(row) {
    this.selectedRowIndex = row.id_bureau;
    this.bureau = Object.assign({}, row);
    this.selectionBureau = true;
  }

  cancelSelect() {
    this.selectedRowIndex = -1;
    this.selectionBureau = false;
    this.clearInput();
  }

  /* onSubmit() {
     if (this.selectionBureau) {
       this.bureauService.updateBureau(this.bureau).subscribe();
     } else {
       this.bureauService.createBureau(this.bureau).subscribe();
     }
   }
   */
  clearInput() {
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
  }

  poserMaterielDansBureau() {
    this.dialog.open(PoserMaterielDansBureauComponent, {
      width: '800px',
      data: this.bureau.id_bureau
    });
  }
}
