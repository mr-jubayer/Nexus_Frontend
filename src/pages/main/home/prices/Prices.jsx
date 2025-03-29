import { Link } from "react-router";
import FilledBtn from "../../../../components/buttons/FilledBtn";
import Heading from "../../../../components/Heading";

const plans = [
  {
    name: "Premium Individual",
    id: "plan-hobby",
    priceMonthly: "00",
    description:
      "Free for 1 month, then $10.99 per month after. it only available if you haven't tried Premium before.",
    buttonText: "Try free for 1 mongth",
    features: [
      "1 Premium account",
      "Cancel anytime",
      " 15 hours/month of listening time from our audiobooks subscriber catalog Try free for 1 month",
    ],
    featured: false,
  },

  {
    name: "Premium Duo",
    id: "plan-duo",
    priceMonthly: "14.99",
    description:
      "15 hours/month of listening time from our audiobooks subscriber catalog plan manager only Get Premium Duo",
    buttonText: "Get Premium Family",
    features: [
      " 2 Premium accounts",
      "Cancel anytime",
      "15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)",
    ],
    featured: true,
  },
  {
    name: "Premium Family",
    id: "plan-family",
    priceMonthly: "16.99",
    description:
      "For up to 6 family members living at the same address, allowing everyone to share the benefits of the plan.",
    buttonText: "Get Premium Duo",
    features: [
      "Up to 6 Premium or Kids accounts",
      "Access to Spotify Kids",
      "Cancel anytime",
      " Block explicit music",
      "15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)",
    ],
    featured: true,
  },
];

export default function Prices() {
  return (
    <div className="relative mt-14 max-w-7xl mx-auto min-h-80 lg:px-20 md:px-10 px-3 pb-10">
      <Heading title=" Choose your plan" />

      <div className="mx-auto mt-7 grid lg:grid-cols-3 sm:grid-cols-2 items-center gap-y-6 gap-x-5 sm:gap-y-0">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={` dark:border-blackGray/50 dark:border shadow-sm p-8 ring-2 ring-gray-900/10 sm:p-10 dark:text-darkHeading flex flex-col justify-between h-full `}
          >
            <div>
              <div>
                <h3 className="text-xl font-semibold ">{plan.name}</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className=" text-5xl font-semibold tracking-tight">
                    {plan.priceMonthly == "00"
                      ? "Free"
                      : `$${plan.priceMonthly}`}
                  </span>
                  <span className="text-gray-500 dark:text-whiteGray text-base">
                    /{!plan.featured ? "for 3 day" : "month"}{" "}
                  </span>
                </p>
              </div>

              <div>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm sm:mt-10 text-gray-600 dark:text-whiteGray"
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <Link to={"subscriptions"}>
                <FilledBtn
                  className={`w-full mt-8 block  transition-all duration-150 hover:bg-myGreen/90 active:bg-myGreen/80 px-3.5 py-2.5 text-center text-sm font-semibold bg-myGreen  text-white`}
                >
                  {plan.buttonText}
                </FilledBtn>
              </Link>
              <p className="mt-6 text-base text-gray-600 dark:text-whiteGray">
                {plan.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
