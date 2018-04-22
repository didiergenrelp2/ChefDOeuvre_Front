import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatTableModule,
  MatNativeDateModule,
  MatListModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatSortModule,
  MatSnackBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilComponent } from './accueil/accueil.component';
import { BureauComponent } from './bureau/bureau.component';
import { MaterielComponent } from './materiel/materiel.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { PoserMaterielDansBureauComponent } from './poser-materiel-dans-bureau/poser-materiel-dans-bureau.component';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SidenavService } from './sidenav.service';
import { ApiService } from './api.service';
import { BureauService } from './bureau.service';
import { MaterielService } from './materiel.service';
import { UtilisateurService } from './utilisateur.service';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    MenuComponent,
    AccueilComponent,
    BureauComponent,
    MaterielComponent,
    UtilisateurComponent,
    PoserMaterielDansBureauComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    SidenavService,
    ApiService,
    UtilisateurService,
    BureauService,
    MaterielService
  ],
  bootstrap: [AppComponent],
  entryComponents: [PoserMaterielDansBureauComponent]
})
export class AppModule { }
