import { Routes } from '@angular/router';
import { RecetteListComponent } from './components/recette-list/recette-list.component';
import { RecetteFormComponent } from './components/recette-form/recette-form.component';
import { RecetteDetailComponent } from './components/recette-detail/recette-detail.component';

export const routes: Routes = [
  { path: '', component: RecetteListComponent },
  { path: 'form', component: RecetteFormComponent },
  { path: 'form/:id', component: RecetteFormComponent },
  { path: 'detail/:id', component: RecetteDetailComponent }
];
