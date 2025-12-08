import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Funding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(10);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: funds = [], refetch } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const res = await axiosSecure.get("/funding");
      return res.data;
    },
  });

  // Check for session_id on return
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      axiosSecure
        .post("/payments/save-session", { sessionId })
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment Successful!",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          // Clear query param
          navigate("/funding", { replace: true });
        });
    }
  }, [searchParams, axiosSecure, navigate, refetch]);

  const openAppModal = () => setIsOpen(true);
  const closeAppModal = () => setIsOpen(false);

  const handleDonate = async () => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        amount,
        donorName: user?.displayName || "Anonymous",
        donorEmail: user?.email || "anonymous@example.com",
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong with the payment gateway!",
      });
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-red-600">Funding</h2>
        <button onClick={openAppModal} className="btn btn-primary">
          Give Fund
        </button>
      </div>

      {/* Funding Table */}
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>Donor Name</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund) => (
              <tr key={fund._id}>
                <td className="font-bold">{fund.name}</td>
                <td>{new Date(fund.date).toLocaleDateString()}</td>
                <td className="text-green-600 font-bold">${fund.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Simplified for Checkout */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-96 relative">
            <button
              onClick={closeAppModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Donate Funding</h3>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Amount ($)</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
                className="input input-bordered"
              />
            </div>

            <button onClick={handleDonate} className="btn btn-primary w-full">
              Proceed to Pay ${amount}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funding;
