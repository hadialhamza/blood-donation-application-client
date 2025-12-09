import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
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
        Swal.fire("Thank You!", "Your donation is now in progress.", "success");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      setIsDialogOpen(false);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!request) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
        Donation Request Details
      </h2>
      <Card className="shadow-lg">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold border-b pb-2">Patient Details</h3>
              <p className="flex justify-between md:justify-start md:gap-2">
                <span className="font-semibold text-muted-foreground">Recipient Name:</span>{" "}
                <span>{request.recipientName}</span>
              </p>
              <div className="flex justify-between md:justify-start md:gap-2 items-center">
                <span className="font-semibold text-muted-foreground">Blood Group:</span>{" "}
                <Badge variant="destructive" className="font-bold">
                  {request.bloodGroup}
                </Badge>
              </div>
              <p className="flex justify-between md:justify-start md:gap-2">
                <span className="font-semibold text-muted-foreground">Location:</span>{" "}
                <span>{request.recipientDistrict}, {request.recipientUpazila}</span>
              </p>
              <p className="flex justify-between md:justify-start md:gap-2">
                <span className="font-semibold text-muted-foreground">Hospital:</span>{" "}
                <span>{request.hospitalName}</span>
              </p>
              <p className="flex justify-between md:justify-start md:gap-2">
                <span className="font-semibold text-muted-foreground">Address:</span>{" "}
                <span>{request.fullAddress}</span>
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold border-b pb-2">Donation Details</h3>
              <p className="flex justify-between md:justify-start md:gap-2">
                <span className="font-semibold text-muted-foreground">Date:</span>{" "}
                <span>{request.donationDate}</span>
              </p>
              <p className="flex justify-between md:justify-start md:gap-2">
                <span className="font-semibold text-muted-foreground">Time:</span>{" "}
                <span>{request.donationTime}</span>
              </p>
              <p className="flex justify-between md:justify-start md:gap-2">
                <span className="font-semibold text-muted-foreground">Status:</span>
                <span className="capitalize">{request.status}</span>
              </p>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-muted-foreground">Message:</span>{" "}
                <p className="text-sm bg-muted p-3 rounded-md italic">
                  "{request.requestMessage}"
                </p>
              </div>
            </div>
          </div>

          {/* Donate Button / Modal Trigger */}
          {request.status === "pending" && (
            <div className="pt-4 flex justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full md:w-auto font-bold bg-red-600 hover:bg-red-700">
                    Donate Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Donation</DialogTitle>
                    <DialogDescription>
                      Please confirm your details to proceed with the donation.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleDonate} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="donorName">Donor Name</Label>
                      <Input
                        id="donorName"
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donorEmail">Donor Email</Label>
                      <Input
                        id="donorEmail"
                        type="text"
                        value={user?.email || ""}
                        readOnly
                        className="bg-muted"
                      />
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-red-600 hover:bg-red-700">
                        Confirm Donate
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationRequestDetails;
