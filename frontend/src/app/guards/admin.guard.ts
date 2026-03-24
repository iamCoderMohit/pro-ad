import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';
import { Router } from 'express';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);

  if (auth.isAdmin()) {
    return true;
  }

  return inject(Router).createUrlTree(['/']);
};