import { Route, Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./task-list/task-list'),
  },
  {
    path: 'new',
    loadComponent: () => import('./task-form/task-form'),
  },
  {
    path: 'edit/:idTask',
    loadComponent: () => import('./task-form/task-form'),
  },
] as Routes;
