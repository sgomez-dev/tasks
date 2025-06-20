import { Route, Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./task-list/task-list'),
  },
] as Routes;
