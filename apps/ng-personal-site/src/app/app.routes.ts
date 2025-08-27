import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SecondPage } from './pages/second-page/second-page';

export type NavData = {
  label: string; // display string for sidebar
  icon: string; // Font Awesome classes
  nav?: boolean; // set false to hide from sidebar
  order?: number; // optional sort
};

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: { label: 'Home', icon: 'fa-solid fa-home', nav: true, order: 1 },
  },
  {
    path: 'second',
    component: SecondPage,
    data: { label: 'Second Page', icon: 'fa-solid fa-crosshairs', nav: true, order: 1 },
  },
];
