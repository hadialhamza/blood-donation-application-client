import React from "react";
import { BadgeCheck, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProfileAccountVerification = ({ dbUser }) => {
  return (
    <Card className="border-red-100 dark:border-red-900 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <BadgeCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Account Status
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Verification level
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Email Verified
            </span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Phone Verified
            </span>
            {dbUser.phone ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Clock className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Medical Info
            </span>
            {dbUser.bloodGroup ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Clock className="w-4 h-4 text-amber-500" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileAccountVerification;
