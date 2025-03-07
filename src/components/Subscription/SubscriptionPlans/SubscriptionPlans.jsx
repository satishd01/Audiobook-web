import React, { useState } from "react";
import subscriptionData from "../../../utils/json/subscriptions.json";

const SubscriptionPlans = () => {
  const [planType, setPlanType] = useState("monthly");
  const [isSelected, setIsSelected] = useState(null);
  const plans = subscriptionData.subscriptions[planType];

  return (
    <div className=" text-white py-10">
      <div className="flex justify-center mb-8">
        <div className="flex font-semibold gap-3 ">
          <button
            className={`px-6 py-2  rounded-lg ${
              planType === "monthly"
                ? "bg-white text-black"
                : "bg-transparent   text-white"
            }`}
            onClick={() => setPlanType("monthly")}>
            Monthly
          </button>
          <button
            className={`px-6 py-2  rounded-lg ${
              planType === "yearly"
                ? "bg-white text-black"
                : "bg-transparent   text-white"
            }`}
            onClick={() => setPlanType("yearly")}>
            Yearly
          </button>
        </div>
      </div>

      <div className="overflow-auto md:overflow-visible">
        <div className="md:grid flex item-center grid-cols-1 md:grid-cols-4 gap-4">
          {plans.map((plan, index) => (
            <div key={index} onClick={() => setIsSelected(index)}>
              <div
                className={`p-6 max-h-52 min-h-52 md:hover:scale-105 cursor-pointer ${
                  isSelected === index
                    ? "bg-gradient-to-br from-red-500/80 via-purple-500/80 to-orange-500/80 text-white shadow-lg"
                    : "bg-black/30 backdrop-blur-md text-white shadow-md border border-white"
                } rounded-lg`}>
                <h3 className="text-lg font-semibold mb-4">{plan.name}</h3>
                <ul className="text-xs space-y-2">
                  {Object.entries(plan.features).map(
                    ([key, value], featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center whitespace-nowrap justify-between">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/_/g, " ")
                          .charAt(0)
                          .toUpperCase() + key.slice(1)}
                        <span>
                          {value === true ? "✔" : value === false ? "✖" : value}
                        </span>
                      </li>
                    )
                  )}
                </ul>
                <button className="mt-4 text-xs">See more</button>
              </div>

              <div
                className={`mt-8 text-lg cursor-pointer rounded-lg py-1 border border-white text-center flex justify-center ${
                  isSelected === index
                    ? "bg-gradient-to-tl from-red-500/80 via-pink-500/80 to-orange-500/80 text-white shadow-lg"
                    : "bg-black/30 backdrop-blur-md text-white shadow-md "
                }`}>
                <p>
                  Price {plan.currency}
                  {plan.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 cursor-pointer bg-black text-xl rounded-lg py-2 border border-white text-center flex justify-center">
        <p>Subscribe</p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
