import React from "react";
import { Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserFilters = ({
  searchQuery,
  setSearchQuery,
  filterRole,
  setFilterRole,
  filterStatus,
  setFilterStatus,
  setCurrentPage
}) => {
  return (
    <Card className="card-container">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-12 h-12 rounded-xl border-zinc-200 dark:border-zinc-800 focus:ring-red-500/20"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <Filter className="w-5 h-5 text-zinc-500" />
              </div>
              <Select
                value={filterRole}
                onValueChange={(value) => {
                  setFilterRole(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[150px] h-12 rounded-xl border-zinc-200 dark:border-zinc-800">
                  <SelectValue placeholder="Filter Role" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                  <SelectItem value="donor">Donor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select
              value={filterStatus}
              onValueChange={(value) => {
                setFilterStatus(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[150px] h-12 rounded-xl border-zinc-200 dark:border-zinc-800">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserFilters;
