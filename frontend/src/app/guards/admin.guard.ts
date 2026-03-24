import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);

  if (auth.isAdmin()) {
    return true;
  }

  return inject(Router).createUrlTree(['/']); 
};