import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Reader } from './Pages/reader/reader';

export const routes: Routes = [
    {
        path:'',
        component: Home,
    },
    {
        path: 'render',
        component: Reader,
    }
];
