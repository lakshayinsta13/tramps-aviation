import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

type HotelResult = {
  name: string;
  area: string;
  rating: number;
  perks: string[];
  pricePerNight: number;
};

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotels.html',
  styleUrl: './hotels.scss',
})
export class Hotels {
  city = '';
  checkIn = '';
  checkOut = '';

  searched = false;
  error = '';

  sort: 'price' | 'rating' = 'price';
  nights = 1;
  results: HotelResult[] = [];

  constructor(private auth: AuthService, private router: Router) { }

  onSearch() {
    this.error = '';
    if (!this.city.trim() || !this.checkIn || !this.checkOut) {
      this.error = 'Please enter City, Check-in and Check-out.';
      return;
    }

    const inD = new Date(this.checkIn);
    const outD = new Date(this.checkOut);
    this.nights = Math.max(1, Math.round((outD.getTime() - inD.getTime()) / (1000 * 60 * 60 * 24)));

    this.results = [
      { name: 'Skyline Residency', area: `${this.city} • Central`, rating: 4.4, perks: ['Free WiFi', 'Breakfast'], pricePerNight: 2599 },
      { name: 'Urban Comfort Suites', area: `${this.city} • Near Mall Road`, rating: 4.1, perks: ['AC', 'Couple Friendly'], pricePerNight: 2199 },
      { name: 'The Grand Horizon', area: `${this.city} • Premium Area`, rating: 4.7, perks: ['Pool', 'Parking'], pricePerNight: 3999 },
      { name: 'Budget Stay Inn', area: `${this.city} • Station Road`, rating: 3.9, perks: ['WiFi', '24x7 Help'], pricePerNight: 1499 }
    ];

    this.searched = true;
    this.applySort();
  }

  applySort() {
    const copy = [...this.results];
    if (this.sort === 'price') copy.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (this.sort === 'rating') copy.sort((a, b) => b.rating - a.rating);
    this.results = copy;
  }

  book(h: HotelResult) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: {
          redirect: '/hotels/booking',
          type: 'hotel',
          id: h.name,
          city: this.city,
          checkIn: this.checkIn,
          checkOut: this.checkOut
        }
      });
      return;
    }

    this.router.navigate(['/hotels/booking'], {
      queryParams: {
        id: h.name,
        city: this.city,
        checkIn: this.checkIn,
        checkOut: this.checkOut
      }
    });
  }

}
