import React from "react";
import plans from "../../../utils/json/plans.json";

const PlanComparisonTable = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Experience the Difference
      </h1>

      <div className="block lg:hidden space-y-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md  text-white">
            <h2 className="text-xl font-bold mb-4">{plan.name}</h2>
            <ul className="space-y-2">
              <li>
                <strong>Access to Full Catalog:</strong>{" "}
                {plan.features.access_to_full_catalog}
              </li>
              <li>
                <strong>High-Quality Audio:</strong>{" "}
                {plan.features.high_quality_audio}
              </li>
              <li>
                <strong>Offline Access:</strong> {plan.features.offline_access}
              </li>
              <li>
                <strong>Unlimited Offline Access:</strong>{" "}
                {plan.features.unlimited_offline_access}
              </li>
              <li>
                <strong>Exclusive Content:</strong>{" "}
                {plan.features.exclusive_content}
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr className=" text-white">
              <th className="py-3 px-4 text-left font-semibold border-b">
                Plan
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Access to Full Catalog
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                High-Quality Audio
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Offline Access
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Unlimited Offline Access
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Exclusive Content
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={index} className="text-white">
                <td className="py-3 px-4 border-b font-medium">{plan.name}</td>
                <td className="py-3 px-4 border-b">
                  {plan.features.access_to_full_catalog}
                </td>
                <td className="py-3 px-4 border-b">
                  {plan.features.high_quality_audio}
                </td>
                <td className="py-3 px-4 border-b">
                  {plan.features.offline_access}
                </td>
                <td className="py-3 px-4 border-b">
                  {plan.features.unlimited_offline_access}
                </td>
                <td className="py-3 px-4 border-b">
                  {plan.features.exclusive_content}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanComparisonTable;
