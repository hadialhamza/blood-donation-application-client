import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxios from "../../hooks/useAxios";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PublicDonationRequests = () => {
  const api = useAxios();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["public-requests"],
    queryFn: async () => {
      const res = await api.get("donation-requests");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-4 text-red-600">
        Donation Requests
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        People around you who need blood urgently.
      </p>

      {requests.length === 0 ? (
        <div className="text-center text-xl font-semibold text-muted-foreground">
          No pending donation requests at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <Card
              key={req._id}
              className="border-t-4 border-t-red-500 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{req.recipientName}</CardTitle>
                <Badge variant="destructive" className="text-white font-bold text-lg px-3 py-1">
                  {req.bloodGroup}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{req.recipientDistrict}, {req.recipientUpazila}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-red-500" />
                    <span>{req.donationDate}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-red-500" />
                    <span>{req.donationTime}</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/donation-request-details/${req._id}`}
                  className="w-full"
                >
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicDonationRequests;
