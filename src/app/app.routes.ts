import { Routes } from '@angular/router';
import { Flights } from './pages/flights/flights';
import { Hotels} from './pages/hotels/hotels';
import { Login } from './pages/login/login';
import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';
import { RefundPolicy } from './pages/refund-policy/refund-policy';

import { FlightBooking } from './pages/flight-booking/flight-booking';
import { HotelBooking } from './pages/hotel-booking/hotel-booking';
import { BookingConfirmation } from './pages/booking-confirmation/booking-confirmation';


export const routes: Routes = [
    { path: '', redirectTo: 'flights', pathMatch: 'full' },
    { path: 'flights', component: Flights },
    { path: 'hotels', component: Hotels },
    { path: 'login', component: Login },
    { path: '**', redirectTo: 'flights' },
    { path: 'terms', component: Terms },
    { path: 'privacy', component: Privacy },
    { path: 'refund-policy', component: RefundPolicy },

    { path: 'flights/booking', component: FlightBooking },
    { path: 'hotels/booking', component: HotelBooking },
    { path: 'booking/confirmation', component: BookingConfirmation },

];
