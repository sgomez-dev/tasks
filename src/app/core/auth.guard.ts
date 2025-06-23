import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authState } from '@angular/fire/auth';
import { AuthStateService } from '../shared/data-access/auth-state.service';
import { map } from 'rxjs';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state: any) => {
        if (!state) {
          router.navigateByUrl('/auth/sign-in');
          return false;
        }
        return true;
      })
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state: any) => {
        if (state) {
          router.navigateByUrl('/tasks');
          return false;
        }
        return true;
      })
    );
  };
};
