import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  error = '';
  info = '';
  private redirect = '/flights';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const r = this.route.snapshot.queryParamMap.get('redirect');
    const type = this.route.snapshot.queryParamMap.get('type');
    const id = this.route.snapshot.queryParamMap.get('id');

    if (r) this.redirect = r;

    if (type === 'flight' && id) this.info = `Login to complete booking for flight ${id}.`;
    if (type === 'hotel' && id) this.info = `Login to complete booking for hotel "${id}".`;
  }

  onLogin() {
    this.error = '';

    // Demo mode: allow anything, but require at least email text
    if (!this.email.trim()) {
      this.error = 'Enter any email to login (demo).';
      return;
    }

    // Optional: static credential mode (uncomment if you want)
    // if (this.email !== 'demo@tramps.com' || this.password !== 'demo123') {
    //   this.error = 'Use demo@tramps.com / demo123';
    //   return;
    // }

    this.auth.login(this.email.trim());
    this.router.navigateByUrl(this.redirect);
  }
}
