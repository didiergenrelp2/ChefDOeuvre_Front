import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConnexionComponent } from './connexion.component';

const connexionRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: ConnexionComponent
  },
  {
    path: 'register',
    component: ConnexionComponent
  }
]);

@NgModule({
  imports: [
    connexionRouting
  ],
  declarations: [
    ConnexionComponent
  ],

  providers: []
})
export class ConnexionModule { }
