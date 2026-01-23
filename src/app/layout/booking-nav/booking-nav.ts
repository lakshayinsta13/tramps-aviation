import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-booking-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './booking-nav.html',
  styleUrl: './booking-nav.scss',
})
export class BookingNavComponent implements AfterViewInit {
  active: 'flights' | 'hotels' = 'flights';
  private animating = false;

  @ViewChild('bar', { static: true }) bar!: ElementRef<HTMLElement>;
  @ViewChild('plane', { static: true }) plane!: ElementRef<HTMLElement>;
  @ViewChild('trail', { static: true }) trail!: ElementRef<HTMLElement>;
  @ViewChild('flightsBtn', { static: true }) flightsBtn!: ElementRef<HTMLElement>;
  @ViewChild('hotelsBtn', { static: true }) hotelsBtn!: ElementRef<HTMLElement>;

  constructor(private router: Router) {
    // update active on route changes & snap plane to correct tab
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.active = this.router.url.includes('/hotels') ? 'hotels' : 'flights';
        queueMicrotask(() => this.snapToActive());
      });
  }

  ngAfterViewInit(): void {
    this.active = this.router.url.includes('/hotels') ? 'hotels' : 'flights';
    this.snapToActive();
  }

  private centerX(targetEl: HTMLElement): number {
    const barRect = this.bar.nativeElement.getBoundingClientRect();
    const tRect = targetEl.getBoundingClientRect();
    return ((tRect.left + tRect.right) / 2) - barRect.left;
  }

  // Y is controlled by CSS (top:70%), so keep baseY as -50%
  private baseY(): string {
    return '-50%';
  }

  private snapToActive() {
    const target = this.active === 'hotels'
      ? this.hotelsBtn.nativeElement
      : this.flightsBtn.nativeElement;

    const x = this.centerX(target);

    // face right by default when snapped
    this.plane.nativeElement.style.transform = `translate(${x}px, ${this.baseY()}) rotate(0deg)`;
    this.trail.nativeElement.style.opacity = '0';
    this.trail.nativeElement.style.width = '0';
  }

  flyTo(mode: 'flights' | 'hotels') {
    if (this.animating) return;
    if (mode === this.active) return;

    this.animating = true;

    const fromTarget = this.active === 'hotels'
      ? this.hotelsBtn.nativeElement
      : this.flightsBtn.nativeElement;

    const toTarget = mode === 'hotels'
      ? this.hotelsBtn.nativeElement
      : this.flightsBtn.nativeElement;

    const fromX = this.centerX(fromTarget);
    const toX = this.centerX(toTarget);
    const distance = Math.abs(toX - fromX);

    // ✅ slower + smooth
    const duration = Math.min(2000, Math.max(1500, distance * 3.0));

    // ✅ curve but keep inside frame
    const lift = Math.min(18, Math.max(10, distance * 0.03));

    const dir = toX > fromX ? 1 : -1;
    const baseRot = dir === 1 ? 0 : 180; // ✅ forward direction always
    const tilt1 = baseRot + (dir === 1 ? 18 : -18);
    const tilt2 = baseRot + (dir === 1 ? 10 : -10);

    const planeEl = this.plane.nativeElement;
    const trailEl = this.trail.nativeElement;

    // Start
    planeEl.style.transform = `translate(${fromX}px, ${this.baseY()}) rotate(${baseRot}deg)`;

    // Trail invisible at takeoff
    trailEl.style.opacity = '0';
    trailEl.style.width = '0';
    trailEl.style.left = `${Math.min(fromX, toX)}px`;

    // Trail appears after takeoff begins
    const trailDelay = 220;
    setTimeout(() => {
      trailEl.style.opacity = '1';
      trailEl.style.width = `${Math.max(90, distance)}px`;
    }, trailDelay);

    // ✅ smoother curve keyframes
    const anim = planeEl.animate(
      [
        { transform: `translate(${fromX}px, ${this.baseY()}) rotate(${baseRot}deg)` },

        { transform: `translate(${fromX + (toX - fromX) * 0.25}px, calc(${this.baseY()} - ${lift}px)) rotate(${tilt1}deg)` },

        { transform: `translate(${fromX + (toX - fromX) * 0.55}px, calc(${this.baseY()} - ${lift}px)) rotate(${tilt2}deg)` },

        { transform: `translate(${toX}px, ${this.baseY()}) rotate(${baseRot}deg)` },
      ],
      { duration, easing: 'cubic-bezier(.2,.9,.2,1)' }
    );

    anim.onfinish = () => {
      planeEl.style.transform = `translate(${toX}px, ${this.baseY()}) rotate(${baseRot}deg)`;

      // Fade trail after landing
      trailEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out' }).onfinish = () => {
        trailEl.style.opacity = '0';
        trailEl.style.width = '0';
      };

      // Navigate after animation
      this.router.navigateByUrl(mode === 'hotels' ? '/hotels' : '/flights');

      this.active = mode;
      this.animating = false;
    };
  }
}
