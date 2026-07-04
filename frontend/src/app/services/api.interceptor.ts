import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isServer = isPlatformServer(platformId);

  // During Server-Side Rendering (SSR)
  if (isServer) {
    const backendHost = process.env['BACKEND_HOST'] || 'localhost';
    const backendPort = process.env['BACKEND_PORT'] || '3000';
    
    // Redirect requests aimed at localhost:3000 to the container host/port if configured
    if (req.url.startsWith('http://localhost:3000')) {
      const targetUrl = req.url.replace('http://localhost:3000', `http://${backendHost}:${backendPort}`);
      const clone = req.clone({
        url: targetUrl
      });
      return next(clone);
    }
  }

  return next(req);
};
