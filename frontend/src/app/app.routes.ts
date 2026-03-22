import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { PagesList } from './components/pages/pages-list/pages-list';
import { Signup } from './components/signup/signup';

export const routes: Routes = [
    {path: "login", component: Login},
    {path: "signup", component: Signup},
    {path: "pages-list", component: PagesList},
    {path: "", redirectTo: "login", pathMatch: 'full'}
];
