import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID)
  const router = inject(Router)

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('token')) {

      return true
    }else{
      router.navigate(['login'])
      return false;
    }
  }else{
    return false;
  }
};
