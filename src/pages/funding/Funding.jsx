import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import {
  Heart,
  DollarSign,
  Calendar,
  User,
  TrendingUp,
  Shield,
  Zap,
  Award,
  ChevronRight,
  Sparkles,
  Target,
  Gift,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const Funding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(10);
  const [selectedAmount, setSelectedAmount] = useState(10);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    data: funds = [],
    refetch,
    isLoading,
  } = useQuery({
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
              title: "🎉 Donation Successful!",
              text: "Your contribution will help save lives. Thank you for being a hero!",
              icon: "success",
              background: "#f0f9ff",
              confirmButtonColor: "#ef4444",
              timer: 2500,
            });
            refetch();
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          navigate("/funding", { replace: true });
        });
    }
  }, [searchParams, axiosSecure, navigate, refetch]);

  const handleDonate = async () => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        amount: selectedAmount,
        donorName: user?.displayName || "Anonymous Hero",
        donorEmail: user?.email || "anonymous@bloodline.com",
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Please try again or contact support if the issue persists.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const quickAmounts = [5, 10, 25, 50, 100, 250];
  const totalRaised = funds.reduce((sum, fund) => sum + fund.amount, 0);
  const recentDonations = funds.slice(0, 10);
  const topDonors = funds
    .reduce((acc, fund) => {
      const existing = acc.find((d) => d.name === fund.name);
      if (existing) {
        existing.total += fund.amount;
      } else {
        acc.push({ name: fund.name, total: fund.amount });
      }
      return acc;
    }, [])
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10">
        <div className="relative">
          <Heart className="animate-pulse text-5xl text-red-600 dark:text-red-400" />
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
        </div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Loading funding data...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10 min-h-screen">
      <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              Financial Support
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
            Fuel Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
              Life-Saving Mission
            </span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Your financial support enables us to maintain blood banks, support
            emergency responses, and ensure no patient ever pays for blood or
            platelets.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-white to-red-50 dark:from-zinc-900 dark:to-red-950/20 border-red-100 dark:border-red-900">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                ${totalRaised.toLocaleString()}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Total Raised
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-red-50 dark:from-zinc-900 dark:to-red-950/20 border-red-100 dark:border-red-900">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                {funds.length}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Donations Made
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-red-50 dark:from-zinc-900 dark:to-red-950/20 border-red-100 dark:border-red-900">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                $50K
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Quarterly Goal
              </p>
              <Progress
                value={(totalRaised / 50000) * 100}
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-red-50 dark:from-zinc-900 dark:to-red-950/20 border-red-100 dark:border-red-900">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                +42%
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Growth This Month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Recent Donations */}
          <div className="lg:col-span-2">
            <Card className="border-red-100 dark:border-red-900 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Recent Donations
                  <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400 ml-auto">
                    Last 10 donations
                  </span>
                </CardTitle>
                <CardDescription>
                  Join these heroes in supporting our mission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDonations.length > 0 ? (
                    recentDonations.map((fund) => (
                      <div
                        key={fund._id}
                        className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <User className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">
                              {fund.name}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {new Date(fund.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${fund.amount}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Tax-deductible
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Gift className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                      <p className="text-zinc-500 dark:text-zinc-400">
                        Be the first to support our mission!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  All donations go directly to blood bank operations
                </div>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Make a Donation
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column: Top Donors & Info */}
          <div className="space-y-6">
            {/* Top Donors */}
            <Card className="border-red-100 dark:border-red-900 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Top Supporters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDonors.map((donor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0
                              ? "bg-amber-100 text-amber-600"
                              : index === 1
                              ? "bg-zinc-100 text-zinc-600"
                              : index === 2
                              ? "bg-rose-100 text-rose-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium">{donor.name}</span>
                      </div>
                      <span className="font-bold text-green-600">
                        ${donor.total}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How Funds Are Used */}
            <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10 border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-400">
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Blood Bank Maintenance</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Storage, testing, and equipment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Emergency Response</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      24/7 logistics and transport
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Donor Support</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Health checkups and care kits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] border-red-200 dark:border-red-900">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <DialogTitle>Make a Life-Saving Contribution</DialogTitle>
            </div>
            <DialogDescription>
              Your donation directly supports blood bank operations and
              emergency response systems.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {/* Quick Amount Selector */}
            <div className="mb-8">
              <Label className="text-sm font-medium mb-3 block">
                Select Amount
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(quickAmount);
                      setAmount(quickAmount);
                    }}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      selectedAmount === quickAmount
                        ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-red-300 dark:hover:border-red-700"
                    }`}
                  >
                    <span className="text-lg font-bold">${quickAmount}</span>
                  </button>
                ))}
                <div className="col-span-3">
                  <Label
                    htmlFor="custom-amount"
                    className="text-sm font-medium mb-2 block"
                  >
                    Or enter custom amount
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <Input
                      id="custom-amount"
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        const value = Math.max(
                          1,
                          parseInt(e.target.value) || 1
                        );
                        setAmount(value);
                        setSelectedAmount(value);
                      }}
                      min="1"
                      className="pl-10 h-12 text-lg"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Preview */}
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Your Contribution</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      ${selectedAmount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Can help save up to
                    </p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      {Math.floor(selectedAmount / 20) * 3} lives
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Note */}
            <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              <Shield className="w-4 h-4 inline mr-1" />
              Secure payment processed with Stripe. All transactions are
              encrypted.
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-zinc-300 dark:border-zinc-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDonate}
              className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Donate ${selectedAmount}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Funding;
