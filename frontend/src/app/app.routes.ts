import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { PagesList } from './components/pages/pages-list/pages-list';
import { Signup } from './components/signup/signup';
import { CreatePage } from './components/pages/create-page/create-page';
import { PageDetail } from './components/pages/page-detail/page-detail';

export const routes: Routes = [
    {path: "login", component: Login},
    {path: "signup", component: Signup},
    {path: "pages-list", component: PagesList},
    {
  path: "pages-list/:id",
  loadComponent: () =>
    import('./components/pages/page-detail/page-detail')
      .then(m => m.PageDetail)
}, //now yoou are getting id fetch data from be and show to ui
    {path: "create-page", component: CreatePage},
    {path: "", redirectTo: "login", pathMatch: 'full'}
];
