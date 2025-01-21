import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCard from "./PaymentCard";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_publishable_key);
function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentCard />
    </Elements>
  );
}

export default Payment;
