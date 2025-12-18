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

const RequestFilters = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  setCurrentPage,
}) => {
  return (
    <Card className="card-container">
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:w-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <Input
              placeholder="Search requests by name, blood group, or location..."
              className="pl-12 h-12 rounded-xl border-zinc-200 dark:border-zinc-800 focus:ring-red-500/20"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hidden md:block">
                <Filter className="w-5 h-5 text-zinc-500" />
              </div>
              <Select
                value={filterStatus}
                onValueChange={(value) => {
                  setFilterStatus(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl border-zinc-200 dark:border-zinc-800">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="done">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestFilters;
