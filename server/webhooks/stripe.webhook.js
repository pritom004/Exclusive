import Order from "../models/order.model.js";
import Stripe from "stripe"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const stripeWebhook = async (request, response) => {
  let event;

 
  if (endpointSecret) {
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
  
    event = request.body;
  }


  try {
    switch (event.type) {
      
    
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
          $set: {
            isPaid: true,
            paymentStatus: "paid",
            orderStatus: "processing"
          },
        });
        console.log(`✅ Payment successful for order: ${paymentIntent.metadata.orderId}`);
        break;
      }

    
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
          $set: {
            isPaid: false,
            paymentStatus: "unpaid", 
          },
        });
        console.error(`❌ Payment failed for order: ${paymentIntent.metadata.orderId}. Reason: ${paymentIntent.last_payment_error?.message}`);
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object;
        await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
          $set: {
            isPaid: false,
            paymentStatus: "unpaid", 
          },
        });
        console.log(`⚠️ Payment intent canceled/expired for order: ${paymentIntent.metadata.orderId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    response.json({ received: true });

  } catch (dbError) {
    console.error(`Database error processing webhook:`, dbError);
    return response.status(500).json({ error: "Internal server error during webhook processing." });
  }
};