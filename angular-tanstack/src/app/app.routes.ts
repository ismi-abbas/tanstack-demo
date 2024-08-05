import type { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpartanComponent } from './spartan/spartan.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'spartan',
    title: 'Spartan',
    component: SpartanComponent,
  },
  {
    path: 'user',
    title: 'User',
    component: UserComponent,
    loadChildren: () => import('./user/user.routes').then((r) => r.userRoutes),
  },
];
