import React from "react";
import { Download, Users, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const SearchResultsHeader = ({ stats, onDownload }) => {
  return (
    <Card className="border-red-100 dark:border-red-900 overflow-hidden py-0 mb-6 gap-0 shadow-md">
      <div className="border-b border-red-100 dark:border-red-900 bg-white dark:bg-zinc-900">
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 py-5">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">
              Available Donors
            </CardTitle>
            <Badge className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-3 py-1">
              {stats.total} Results
            </Badge>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
            className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <CardContent className="">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-red-100 dark:border-red-900">
          <div className="p-6 flex items-center justify-around">
            <div className="text-center space-y-1">
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.total}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                Donor Matches
              </p>
              <p className="text-xs text-zinc-400">Compatible donors found</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <Users className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <div className="p-6 flex items-center justify-around">
            <div className="text-center space-y-1">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.available}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                Available Now
              </p>
              <p className="text-xs text-zinc-400">
                Ready to donate immediately
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultsHeader;
