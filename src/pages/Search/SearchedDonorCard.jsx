import React from "react";
import { MapPin, Calendar, Heart, Phone, Mail, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const SearchedDonorCard = ({ donor }) => {
  return (
    <Card className="group border-2 border-red-100 dark:border-red-900 hover:border-red-300 dark:hover:border-red-700 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-red-500 to-rose-500" />
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar & Status */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-white dark:border-zinc-800 shadow-lg">
                <AvatarImage src={donor.avatar} alt={donor.name} />
                <AvatarFallback className="text-2xl font-bold bg-linear-to-r from-red-600 to-rose-600 text-white">
                  {donor.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <Badge
              className={`px-3 py-1 ${
                donor.status === "active"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-amber-100 text-amber-700 border-amber-200"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  donor.status === "active"
                    ? "bg-green-500 animate-pulse"
                    : "bg-amber-500"
                }`}
              />
              {donor.status === "active" ? "Available" : "Unavailable"}
            </Badge>
          </div>

          {/* Donor Details */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {donor.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  <MapPin className="w-4 h-4" />
                  {donor.district}, {donor.upazila}
                </div>
              </div>
              <div className="">
                <Badge className="bg-linear-to-r from-red-600 to-rose-600 text-white px-3 py-1 text-base font-bold">
                  <Droplets className=" mr-1" />
                  {donor.bloodGroup}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Last Donation</p>
                  <p className="text-sm font-medium">
                    {donor.lastDonation
                      ? new Date(donor.lastDonation).toLocaleDateString()
                      : "First time"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Total Donations</p>
                  <p className="text-sm font-medium">
                    {donor.totalDonations || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              >
                <Phone className="w-4 h-4 mr-2" /> Call
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <Mail className="w-4 h-4 mr-2" /> Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchedDonorCard;
