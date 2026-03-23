import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { PagesList } from './components/pages/pages-list/pages-list';
import { Signup } from './components/signup/signup';
import { CreatePage } from './components/pages/create-page/create-page';
import { PageDetail } from './components/pages/page-detail/page-detail';
import { CreateCampaign } from './components/campaigns/create-campaign/create-campaign';
import { CampaignsDashboard } from './components/campaigns/campaigns-dashboard/campaigns-dashboard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'pages-list', component: PagesList },
  {
    path: 'pages-list/:id',
    loadComponent: () =>
      import('./components/pages/page-detail/page-detail').then((m) => m.PageDetail),
  },
  { path: 'create-page', component: CreatePage },
  { path: 'create-campaign', component: CreateCampaign },
  { path: 'campaign/:id', loadComponent: () => import('./components/campaigns/campaigns-dashboard/campaigns-dashboard').then((m) => m.CampaignsDashboard) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
