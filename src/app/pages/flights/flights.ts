import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type FlightResult = {
  airline: string;
  flightNo: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: string;
  price: number;
};

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flights.html',
  styleUrl: './flights.scss',
})
export class Flights {
  from = '';
  to = '';
  date = '';
  pax = 1;

  searched = false;
  error = '';
  sort: 'price' | 'depart' = 'price';
  results: FlightResult[] = [];

  constructor(private router: Router) { }

  onSearch() {
    this.error = '';
    if (!this.from.trim() || !this.to.trim() || !this.date) {
      this.error = 'Please enter From, To and Departure date.';
      return;
    }

    this.results = [
      { airline: 'IndiGo', flightNo: '6E 203', departTime: '06:10', arriveTime: '08:20', duration: '2h 10m', stops: 'Non-stop', price: 4699 },
      { airline: 'Air India', flightNo: 'AI 817', departTime: '09:05', arriveTime: '11:30', duration: '2h 25m', stops: 'Non-stop', price: 5299 },
      { airline: 'Vistara', flightNo: 'UK 941', departTime: '13:40', arriveTime: '16:05', duration: '2h 25m', stops: 'Non-stop', price: 6199 },
      { airline: 'SpiceJet', flightNo: 'SG 121', departTime: '18:15', arriveTime: '21:05', duration: '2h 50m', stops: '1 stop', price: 3999 }
    ];

    this.searched = true;
    this.applySort();
  }

  applySort() {
    const copy = [...this.results];
    if (this.sort === 'price') copy.sort((a, b) => a.price - b.price);
    if (this.sort === 'depart') copy.sort((a, b) => a.departTime.localeCompare(b.departTime));
    this.results = copy;
  }

  book(f: FlightResult) {
    this.router.navigate(['/flights/booking'], {
      queryParams: {
        id: f.flightNo,
        from: this.from,
        to: this.to,
        date: this.date
      }
    });
  }
}
