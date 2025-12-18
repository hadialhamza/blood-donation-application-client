import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  MapPin,
  Calendar,
  Clock,
  Building2,
  User,
  ArrowLeft,
  Droplet,
  MessageSquareQuote,
  AlertCircle,
  HeartHandshake,
} from "lucide-react";
import Loading from "@/components/shared/Loading";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/donation-request/${id}`)
      .then((res) => setRequest(res.data));
  }, [id, axiosSecure]);

  // Handle Donation
  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.put(`/donation-request/donate/${id}`, {
        donorName: user.displayName,
        donorEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        setIsDialogOpen(false);
        Swal.fire({
          title: "Hero!",
          text: "Thank you for stepping up. The recipient has been notified.",
          icon: "success",
          confirmButtonColor: "#DC2626",
        });
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      setIsDialogOpen(false);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!request) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto mb-6">
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent hover:text-red-600 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Requests
        </Button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 overflow-hidden">
            <div className="h-2 w-full bg-linear-to-r from-red-500 to-rose-600"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge
                    variant={
                      request.status === "pending" ? "default" : "secondary"
                    }
                    className={`mb-3 ${
                      request.status === "pending"
                        ? "bg-amber-500 hover:bg-amber-600"
                        : "bg-green-600"
                    }`}
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />{" "}
                    {request.status === "pending"
                      ? "Urgent Request"
                      : "Fulfilled"}
                  </Badge>
                  <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    {request.recipientName}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />{" "}
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </CardDescription>
                </div>
                <div className="lg:hidden h-16 w-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex flex-col items-center justify-center border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 font-black">
                  <Droplet className="w-4 h-4 fill-current mb-1" />
                  <span className="text-xl">{request.bloodGroup}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Patient Message */}
              <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 relative">
                <MessageSquareQuote className="absolute top-4 left-4 w-8 h-8 text-red-200 dark:text-red-900/30" />
                <p className="relative z-10 text-zinc-700 dark:text-zinc-300 italic text-lg pl-6">
                  "{request.requestMessage}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Medical Center
                  </h4>
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                    <p className="font-bold text-zinc-900 dark:text-white text-lg">
                      {request.hospitalName}
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">
                      {request.fullAddress}
                    </p>
                  </div>
                </div>

                {/* Timing Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Required Time
                  </h4>
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span className="font-semibold">
                        {request.donationDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="font-semibold">
                        {request.donationTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-xl bg-linear-to-br from-red-600 to-rose-700 text-white relative overflow-hidden hidden lg:block">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-2xl"></div>

            <CardContent className="p-8 flex flex-col items-center justify-center text-center relative z-10">
              <p className="text-red-100 font-medium mb-2 uppercase tracking-widest text-xs">
                Blood Group Needed
              </p>
              <div className="text-6xl font-black mb-2 flex items-center gap-2">
                {request.bloodGroup}{" "}
                <Droplet className="w-8 h-8 fill-current opacity-80" />
              </div>
              <p className="text-sm text-red-50 opacity-90">
                Please ensure you match this blood group before proceeding.
              </p>
            </CardContent>
          </Card>

          {/* Action Card */}
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Ready to help?</CardTitle>
              <CardDescription>
                Review the details and confirm your donation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{" "}
                  You are logged in as{" "}
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {user?.displayName}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{" "}
                  Contact details will be shared upon confirmation.
                </li>
              </ul>

              {request.status === "pending" ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="w-full font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 h-12 text-lg"
                    >
                      <HeartHandshake className="w-5 h-5 mr-2" /> Donate Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-2xl">
                        <HeartHandshake className="w-6 h-6 text-red-600" />{" "}
                        Confirm Donation
                      </DialogTitle>
                      <DialogDescription>
                        You are about to commit to donating blood for{" "}
                        <span className="font-bold text-zinc-900 dark:text-white">
                          {request.recipientName}
                        </span>
                        .
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleDonate} className="space-y-4 py-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="donorName">Donor Name</Label>
                          <Input
                            id="donorName"
                            value={user?.displayName || ""}
                            readOnly
                            className="bg-slate-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="donorEmail">Donor Email</Label>
                          <Input
                            id="donorEmail"
                            value={user?.email || ""}
                            readOnly
                            className="bg-slate-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 font-medium"
                          />
                        </div>
                      </div>

                      <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-red-600 hover:bg-red-700 text-white font-bold"
                        >
                          Confirm Commitment
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  disabled
                  size="lg"
                  className="w-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold border border-zinc-300 dark:border-zinc-700"
                >
                  Request Closed
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
