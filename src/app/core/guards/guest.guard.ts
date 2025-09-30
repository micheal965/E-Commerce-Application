import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const plateformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(plateformId)) {
    if (localStorage.getItem('token') !== null) {
      router.navigate(['/home']);
      return false;
    }
    return true;
  }
  return false;
};
