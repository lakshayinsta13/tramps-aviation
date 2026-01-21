import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

type Pax = {
  title: 'Mr' | 'Ms' | 'Mrs';
  firstName: string;
  lastName: string;
  dob: string;
};

@Component({
  selector: 'app-flight-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './flight-booking.html',
  styleUrl: './flight-booking.scss',
})
export class FlightBooking {
  // from query params (demo)
  flightId = '';
  from = '';
  to = '';
  date = '';

  // form
  pax: Pax[] = [{ title: 'Mr', firstName: '', lastName: '', dob: '' }];
  email = '';
  phone = '';
  accept = false;

  error = '';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/flights/booking' } });
      return;
    }

    this.flightId = this.route.snapshot.queryParamMap.get('id') || '';
    this.from = this.route.snapshot.queryParamMap.get('from') || '';
    this.to = this.route.snapshot.queryParamMap.get('to') || '';
    this.date = this.route.snapshot.queryParamMap.get('date') || '';
  }

  addPassenger() {
    this.pax.push({ title: 'Mr', firstName: '', lastName: '', dob: '' });
  }

  removePassenger(i: number) {
    if (this.pax.length === 1) return;
    this.pax.splice(i, 1);
  }

  confirm() {
    this.error = '';

    if (!this.email.trim() || !this.phone.trim()) {
      this.error = 'Please enter email and phone.';
      return;
    }
    if (!/^\d{10}$/.test(this.phone.trim())) {
      this.error = 'Phone must be 10 digits.';
      return;
    }
    for (const p of this.pax) {
      if (!p.firstName.trim() || !p.lastName.trim()) {
        this.error = 'Please fill passenger first and last name.';
        return;
      }
    }
    if (!this.accept) {
      this.error = 'Please accept Terms & Policies to continue.';
      return;
    }

    // demo store booking
    const bookingId = 'TA' + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('ta_last_booking', JSON.stringify({
      type: 'flight',
      bookingId,
      flightId: this.flightId,
      route: `${this.from} → ${this.to}`,
      date: this.date,
      passengers: this.pax,
      email: this.email,
      phone: this.phone
    }));

    this.router.navigate(['/booking/confirmation']);
  }
}
