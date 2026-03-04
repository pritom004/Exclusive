import {loadStripe} from '@stripe/stripe-js';


export const stripePromise = loadStripe(import.meta.env.CLIENT_SECRET)