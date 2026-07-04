import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-sm py-4 px-6 transition-all duration-300">
      <div class="container mx-auto max-w-7xl flex justify-between items-center">
        <!-- Logo / Title -->
        <div 
          class="flex items-center gap-2.5 cursor-pointer group"
          routerLink="/"
        >
          <div class="h-9 w-9 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold tracking-wider text-lg shadow-md group-hover:bg-indigo-600 transition-colors">
            A
          </div>
          <span class="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-indigo-800 transition-all duration-300">
            ArchShowcase
          </span>
        </div>

        <!-- Navigation Links -->
        <nav class="flex items-center gap-1 md:gap-2">
          <a
            routerLink="/"
            [routerLinkActiveOptions]="{ exact: true }"
            routerLinkActive="bg-slate-900 text-white shadow-sm"
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
          >
            Home
          </a>

          <a
            routerLink="/about"
            routerLinkActive="bg-slate-900 text-white shadow-sm"
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
          >
            About
          </a>

          <a
            routerLink="/admin"
            routerLinkActive="bg-slate-900 text-white shadow-sm"
            class="ml-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
            Admin Panel
          </a>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
