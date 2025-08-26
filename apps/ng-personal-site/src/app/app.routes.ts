import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SecondPage } from './pages/second-page/second-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'second',
    component: SecondPage,
  },
];
