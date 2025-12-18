import React from "react";
import { Link } from "react-router";
import {
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Droplets,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RequestCard = ({
  req,
  role,
  handleStatusChange,
  handleDelete,
  getStatusBadge,
}) => {
  return (
    <Card className="group card-container hover:shadow-lg hover:border-red-200 dark:hover:border-red-800 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge
                    className={`px-3 py-1 rounded-full border shadow-sm ${getStatusBadge(
                      req.status
                    )}`}
                  >
                    {req.status.toUpperCase()}
                  </Badge>
                  <Badge className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border border-red-100 dark:border-red-800 px-3 py-1 rounded-full">
                    {req.bloodGroup}
                  </Badge>
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                  Request for {req.recipientName}
                </h4>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  By{" "}
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {req.requesterName}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Location
                  </p>
                  <p
                    className="font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-[120px]"
                    title={req.recipientDistrict}
                  >
                    {req.recipientDistrict}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Date
                  </p>
                  <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {req.donationDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-100 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Group
                  </p>
                  <p className="font-bold text-red-600 dark:text-red-400">
                    {req.bloodGroup}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
            <Select
              value={req.status}
              onValueChange={(value) => handleStatusChange(req._id, value)}
            >
              <SelectTrigger className="w-[130px] h-10 border-none bg-white dark:bg-zinc-900 shadow-sm rounded-xl focus:ring-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <MoreVertical className="w-5 h-5 text-zinc-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                <Link to={`/dashboard/donation-request-details/${req._id}`}>
                  <DropdownMenuItem className="cursor-pointer rounded-lg font-medium">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                </Link>

                {role === "admin" && (
                  <>
                    <Link to={`/dashboard/update-request/${req._id}`}>
                      <DropdownMenuItem className="cursor-pointer rounded-lg font-medium text-blue-600 focus:text-blue-700 focus:bg-blue-50 dark:focus:bg-blue-900/20">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Request
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg font-medium text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/20"
                      onClick={() => handleDelete(req._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Request
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
