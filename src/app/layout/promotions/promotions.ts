import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

type Promo = {
  title: string;
  subtitle: string;
  tag: string;
  perks: string[];
  primaryCta: { label: string; link: string };
  secondaryCta?: { label: string; link: string };
};

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './promotions.html',
  styleUrl: './promotions.scss',
})
export class PromotionsComponent {
  /** where this promo is shown (optional) */
  @Input() context: 'flights' | 'hotels' | 'home' = 'home';

  promos: Promo[] = [
    {
      title: 'Bundle & Save',
      subtitle: 'Book Flight + Hotel together and save more (demo)',
      tag: 'Best Value',
      perks: ['Extra coupon savings', 'Faster checkout', 'One booking summary'],
      primaryCta: { label: 'Explore Bundles', link: '/bundles' },
      secondaryCta: { label: 'View Offers', link: '/hotels' },
    },
    {
      title: 'Zero Convenience Fee',
      subtitle: 'Limited-time promo on select routes (demo)',
      tag: 'Limited',
      perks: ['Lower total price', 'Quick booking', 'No hidden steps'],
      primaryCta: { label: 'Book Flights', link: '/flights' },
      secondaryCta: { label: 'Book Hotels', link: '/hotels' },
    },
    {
      title: 'Premium Stays Spotlight',
      subtitle: 'Top-rated hotels with great deals (demo)',
      tag: 'Trending',
      perks: ['4★ & 5★ stays', 'Breakfast deals', 'Free cancellation tags'],
      primaryCta: { label: 'Search Hotels', link: '/hotels' },
      secondaryCta: { label: 'Try Bundles', link: '/bundles' },
    },
  ];

  constructor(private router: Router) {}

  go(link: string) {
    this.router.navigateByUrl(link);
  }
}
