const tiers = [
  {
    name: "Premium Individual",
    id: "tier-hobby",
    priceMonthly: "Free",
    description:
      "Free for 1 month, then $10.99 per month after. Offer only available if you haven't tried Premium before. Terms apply $14.99.",
    buttonText: "Try free for 1 mongth",
    features: ["1 Premium account", "Cancel anytime"],
    featured: false,
  },
  {
    name: "Premium Family",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$99",
    description:
      "15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only Get Premium Family.",
    features: [
      "Up to 6 Premium or Kids accounts",
      "Access to Spotify Kids",
      "Cancel anytime",
      " Block explicit music",
    ],
    featured: true,
  },
  {
    name: "Premium Duo",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$16.99",
    description:
      "15 hours/month of listening time from our audiobooks subscriber catalog plan manager only Get Premium Duo",
    features: [
      " 2 Premium accounts",
      "Cancel anytime",
      "15 hours/month of listening time for our audiobooks subscriber catelog.",
      "24-hour support response time",
    ],
    featured: true,
  },
];

export default function Prices() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl">
          Choose your plan
        </p>
      </div>
      <p className="mx-auto mt-2 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        Choose the plan that fits your needs and get started today.
      </p>
      <div className="mx-auto my-10 grid grid-cols-3 items-center gap-y-6 gap-x-3 sm:mt-20 sm:gap-y-0">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="sm:rounded-b-none p-8 ring-1 ring-gray-900/10 sm:p-10 bg-white"
          >
            <h3 className="text-base font-semibold">{tier.name}</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-gray-900 text-5xl font-semibold tracking-tight">
                {tier.priceMonthly}
              </span>
              <span className="text-gray-500 text-base">/month</span>
            </p>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm sm:mt-10 text-gray-600"
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600"
            >
              Get started today
            </a>
            <p className="mt-6 text-base text-gray-600">{tier.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
