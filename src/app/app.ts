import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer} from './layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header></app-header>

    <main style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `
})
export class AppComponent {}
