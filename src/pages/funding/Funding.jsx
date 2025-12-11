import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Button onClick={() => setIsOpen(true)}>Give Fund</Button>
      </div>

      {/* Funding Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="hidden md:table-header-group">
            <TableRow>
              <TableHead>Donor Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funds.map((fund) => (
              <TableRow
                key={fund._id}
                className="block md:table-row mb-6 md:mb-0 border rounded-lg md:border-b md:rounded-none shadow-sm md:shadow-none bg-card md:bg-transparent overflow-hidden"
              >
                <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                  <span className="font-bold md:hidden">Donor Name</span>
                  <span className="font-bold">{fund.name}</span>
                </TableCell>
                <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                  <span className="font-bold md:hidden">Date</span>
                  {new Date(fund.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                  <span className="font-bold md:hidden">Amount</span>
                  <span className="text-green-600 font-bold">
                    ${fund.amount}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal - Simplified for Checkout */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Donate Funding</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleDonate} className="w-full">
              Proceed to Pay ${amount}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Funding;
