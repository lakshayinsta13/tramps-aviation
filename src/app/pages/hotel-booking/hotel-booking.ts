import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-hotel-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './hotel-booking.html',
  styleUrl: './hotel-booking.scss',
})
export class HotelBooking {
  hotelId = '';
  city = '';
  checkIn = '';
  checkOut = '';

  fullName = '';
  email = '';
  phone = '';
  specialRequest = '';

  accept = false;
  error = '';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/hotels/booking' } });
      return;
    }

    this.hotelId = this.route.snapshot.queryParamMap.get('id') || '';
    this.city = this.route.snapshot.queryParamMap.get('city') || '';
    this.checkIn = this.route.snapshot.queryParamMap.get('checkIn') || '';
    this.checkOut = this.route.snapshot.queryParamMap.get('checkOut') || '';
  }

  confirm() {
    this.error = '';
    if (!this.fullName.trim() || !this.email.trim() || !this.phone.trim()) {
      this.error = 'Please enter name, email and phone.';
      return;
    }
    if (!/^\d{10}$/.test(this.phone.trim())) {
      this.error = 'Phone must be 10 digits.';
      return;
    }
    if (!this.accept) {
      this.error = 'Please accept Terms & Policies to continue.';
      return;
    }

    const bookingId = 'TA' + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('ta_last_booking', JSON.stringify({
      type: 'hotel',
      bookingId,
      hotelId: this.hotelId,
      city: this.city,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      name: this.fullName,
      email: this.email,
      phone: this.phone,
      specialRequest: this.specialRequest
    }));

    this.router.navigate(['/booking/confirmation']);
  }
}
