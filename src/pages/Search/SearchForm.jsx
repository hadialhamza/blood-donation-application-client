import React from "react";
import { Search as SearchIcon, ChevronRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationSelector from "@/components/form/LocationSelector";
import FormSelect from "@/components/form/FormSelect";
import { BLOOD_GROUPS } from "@/data/Data";

const SearchForm = ({ onSubmit, loading, control, errors }) => {
  return (
    <Card className="mb-6 py-0 overflow-hidden border-red-100 dark:border-red-900 shadow-md">
      <CardHeader className="text-center bg-linear-to-r from-red-600 to-rose-600 text-white shadow-lg py-4">
        <CardTitle className="flex items-center justify-center gap-3 md:text-xl text-white">
          <SearchIcon className="w-6 h-6" />
          <span>Find Compatible Donors</span>
        </CardTitle>
        <p className="text-red-100 text-sm font-normal">
          Select criteria to search for available donors in your area
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blood Group */}
            <FormSelect
              control={control}
              name="bloodGroup"
              label="Blood Group"
              icon={Droplets}
              placeholder="Select Group"
              options={BLOOD_GROUPS}
              rules={{ required: true }}
            />

            {/* Location */}
            <div className="col-span-1 md:col-span-2">
              <LocationSelector control={control} errors={errors} />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className=" bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all mb-6"
              disabled={loading}
            >
              <SearchIcon className="w-5 h-5 mx-2" /> Search Donors
              <ChevronRight className="w-4 h-4 mx-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
