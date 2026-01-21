import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-confirmation.html',
})
export class BookingConfirmation {
  data: any = null;

  constructor() {
    const raw = localStorage.getItem('ta_last_booking');
    this.data = raw ? JSON.parse(raw) : null;
  }
}
