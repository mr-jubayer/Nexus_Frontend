import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import FilledBtn from "../../components/buttons/FilledBtn";
import Heading from "../../components/Heading";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Navigate, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import { useNotifications } from "reapop";

function PaymentCard() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const [clientSecret, setClientSecret] = useState("");
  const [transition, setTransition] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const loc = useLocation();
  const amount = loc?.state?.amount;

  useEffect(() => {
    (async function () {
      const { data } = await axiosSecure.post(
        `/api/payment/create-payment-intent`,
        {
          amount: amount?.amount,
        }
      );
      setClientSecret(data.clientSecret);
    })();
  }, [axiosSecure, amount]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Ensure Stripe.js and Elements are loaded
    if (!stripe || !elements) return;

    // Get the CardElement from the elements
    const card = elements.getElement(CardElement);
    if (!card) return;
    setLoading(true);
    setError("");

    try {
      // Create the payment method
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setError(error.message);
      } else {
        setError("");
      }

      const { paymentIntent, error: confirmationError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: userInfo.name,
              email: userInfo.email,
            },
          },
        });

      if (confirmationError) {
        return;
      } else {
        if (paymentIntent.status === "succeeded") {
          //  save payment information to database
          setTransition(paymentIntent.id);

          const paymentInfo = {
            email: userInfo.email,
            amount: amount.amount,
            tokenDate: amount.value, // it's millisecond format you have to convert it to date
            transitionId: paymentIntent.id,
            paymentTime: Date.now(),
          };

          await axiosSecure.post(`/api/payment/payments-data`, paymentInfo);
          notify(
            `Payment Succedded with the Transition Id: ${paymentIntent.id}`,
            "success"
          );
          navigate("/");
        }
      }
    } catch (error) {
      notify("Error in payment submission:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!amount) return <Navigate to={"/subscriptions"} />;

  return (
    <div className="max-w-[600px] mx-auto my-12 p-8 rounded-lg  border-2 border-myGreen">
      <Heading title="Payment" />
      <form onSubmit={handlePaymentSubmit} className="space-y-6">
        {/* Card Input */}
        <div className="p-4 border border-myGreen rounded-md  focus-within:ring-4 focus-within:ring-myGreen ">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  // Adding border and shadow to match card style
                  border: "1px solid #3065b4",
                  borderRadius: "8px",
                  padding: "12px",
                  transition: "all 0.3s ease-in-out",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        {/* Submit Button */}
        <FilledBtn
          disabled={!stripe || !clientSecret}
          className={` flex justify-center bg-myGreen text-white w-full py-3 rounded-md text-lg hover:bg-myGreen/75 active:bg-myGreen/90 ${(!stripe && "bg-gray-400") || (!clientSecret && "bg-gray-400")}`}
        >
          {loading ? (
            <span className="text-center mx-auto">
              <ImSpinner9 className="animate-spin duration-100 text-2xl " />
            </span>
          ) : (
            `Pay $${amount?.amount} for ${amount.label}`
          )}
        </FilledBtn>
        <p className="text-red-600 mt-2">{error}</p>
        {transition && (
          <p className="text-green-600"> Your transaction id: {transition}</p>
        )}
      </form>
    </div>
  );
}

export default PaymentCard;
