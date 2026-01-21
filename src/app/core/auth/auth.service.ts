import { Injectable } from '@angular/core';

export type DemoUser = { email: string; role?: 'user' | 'admin' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'ta_demo_user';

  get user(): DemoUser | null {
    const raw = localStorage.getItem(this.key);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  login(email: string): void {
    // demo: accept anything
    const user: DemoUser = { email, role: 'user' };
    localStorage.setItem(this.key, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.key);
  }
}
