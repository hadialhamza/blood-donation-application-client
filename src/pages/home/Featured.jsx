import React from "react";
import { FaHeartbeat, FaHandHoldingHeart, FaUserFriends } from "react-icons/fa";

const Featured = () => {
  return (
    <div className="py-20 px-4 bg-base-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-red-600">Why Donate Blood?</h2>
        <p className="text-gray-500 mt-2">
          Be the reason for someone's heartbeat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="card bg-base-100 shadow-xl border-t-4 border-red-500">
          <div className="card-body items-center text-center">
            <FaHeartbeat className="text-6xl text-red-500 mb-4" />
            <h2 className="card-title">Save Lives</h2>
            <p>
              One pint of blood can save up to three lives. Your contribution
              makes a direct impact.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-100 shadow-xl border-t-4 border-red-500">
          <div className="card-body items-center text-center">
            <FaHandHoldingHeart className="text-6xl text-red-500 mb-4" />
            <h2 className="card-title">Health Benefits</h2>
            <p>
              Regular blood donation can help reduce the risk of heart disease
              and stimulate blood cell production.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 shadow-xl border-t-4 border-red-500">
          <div className="card-body items-center text-center">
            <FaUserFriends className="text-6xl text-red-500 mb-4" />
            <h2 className="card-title">Community Support</h2>
            <p>
              Join a community of heroes who are ready to help whenever and
              wherever needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
