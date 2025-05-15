import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID)
  const router = inject(Router)


  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('token')) {
      return false;
    }else{
      return true
    }
  }else{
    return false;
  }
};
