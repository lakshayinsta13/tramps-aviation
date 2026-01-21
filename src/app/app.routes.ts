import { Routes } from '@angular/router';
import { Flights } from './pages/flights/flights';
import { Hotels } from './pages/hotels/hotels';
import { Login } from './pages/login/login';
import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';
import { RefundPolicy } from './pages/refund-policy/refund-policy';

import { FlightBooking } from './pages/flight-booking/flight-booking';
import { HotelBooking } from './pages/hotel-booking/hotel-booking';
import { BookingConfirmation } from './pages/booking-confirmation/booking-confirmation';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'flights', pathMatch: 'full' },

    { path: 'flights', component: Flights },
    { path: 'hotels', component: Hotels },
    { path: 'login', component: Login },

    { path: 'terms', component: Terms },
    { path: 'privacy', component: Privacy },
    { path: 'refund-policy', component: RefundPolicy },

    // 🔐 Protected routes
    { path: 'flights/booking', component: FlightBooking, canActivate: [authGuard] },
    { path: 'hotels/booking', component: HotelBooking, canActivate: [authGuard] },
    { path: 'booking/confirmation', component: BookingConfirmation, canActivate: [authGuard] },

    // ❗ Always LAST
    { path: '**', redirectTo: 'flights' },
];
