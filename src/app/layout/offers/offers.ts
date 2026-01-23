import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type OfferMode = 'flights' | 'hotels';

type Offer = {
  title: string;
  subtitle: string;
  code: string;
  badge: string;
  expiresIn: string;
  cta: string;
};

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.html',
  styleUrl: './offers.scss',
})
export class OffersComponent {
  @Input() mode: OfferMode = 'flights';

  private flightOffers: Offer[] = [
    {
      title: 'Flight Saver',
      subtitle: '₹300 off on domestic flights',
      code: 'FLY300',
      badge: 'Flights',
      expiresIn: 'Ends soon',
      cta: 'Apply',
    },
    {
      title: 'Student Deal',
      subtitle: 'Extra ₹200 off on student bookings',
      code: 'STUDENT200',
      badge: 'New',
      expiresIn: '48 hours',
      cta: 'Grab',
    },
    {
      title: 'Bank Offer',
      subtitle: 'Up to 10% off with select cards',
      code: 'BANK10',
      badge: 'Limited',
      expiresIn: 'This week',
      cta: 'View',
    },
    {
      title: 'Early Bird',
      subtitle: 'Book early & save more (demo)',
      code: 'EARLY150',
      badge: 'Deal',
      expiresIn: '3 days',
      cta: 'Apply',
    },
    {
      title: 'App Exclusive',
      subtitle: 'Extra ₹150 off via app bookings',
      code: 'APP150',
      badge: 'Exclusive',
      expiresIn: 'Today',
      cta: 'Grab',
    },
    {
      title: 'Weekend Flight Sale',
      subtitle: 'Special fares for Fri–Sun travel',
      code: 'WEEKFLY',
      badge: 'Sale',
      expiresIn: 'Weekend',
      cta: 'Apply',
    },
  ];

  private hotelOffers: Offer[] = [
    {
      title: 'Hotel Fest',
      subtitle: 'Up to ₹500 off on hotels',
      code: 'STAY500',
      badge: 'Hotels',
      expiresIn: 'This month',
      cta: 'Apply',
    },
    {
      title: 'Couple Special',
      subtitle: 'Flat ₹250 off for couple stays',
      code: 'COUPLE250',
      badge: 'Popular',
      expiresIn: 'Today',
      cta: 'Grab',
    },
    {
      title: 'Weekend Special',
      subtitle: 'Extra savings on Fri–Sun stays',
      code: 'WEEKEND',
      badge: 'Deal',
      expiresIn: '48 hours',
      cta: 'Apply',
    },
    {
      title: 'Long Stay Offer',
      subtitle: 'Save more on 3+ night stays',
      code: 'LONGSTAY',
      badge: 'Saver',
      expiresIn: 'This week',
      cta: 'Apply',
    },
    {
      title: 'Wallet Cashback',
      subtitle: 'Get ₹200 cashback (demo)',
      code: 'CASH200',
      badge: 'Cashback',
      expiresIn: 'Ends soon',
      cta: 'Grab',
    },
    {
      title: 'Premium Hotel Deal',
      subtitle: 'Extra savings on premium hotels',
      code: 'PREMIUM',
      badge: 'Luxury',
      expiresIn: 'This month',
      cta: 'View',
    },
  ];


  get offers(): Offer[] {
    return this.mode === 'hotels' ? this.hotelOffers : this.flightOffers;
  }

  copy(code: string) {
    navigator.clipboard?.writeText(code);
  }
}
