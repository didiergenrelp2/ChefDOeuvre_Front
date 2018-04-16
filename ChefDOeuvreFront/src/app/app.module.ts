import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { AccueilComponent } from './accueil/accueil.component';
import { SidenavService } from './sidenav.service';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { UtilisateurService } from './utilisateur.service';
import { BureauComponent } from './bureau/bureau.component';
import { MaterielComponent } from './materiel/materiel.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent,
    AccueilComponent,
    UtilisateurComponent,
    BureauComponent,
    MaterielComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MatSnackBarModule
  ],
  providers: [
    SidenavService,
    ApiService,
    UtilisateurService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
