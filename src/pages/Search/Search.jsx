import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { TbFidgetSpinner } from "react-icons/tb";
import useLocations from "../../hooks/useLocations";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Search = () => {
  const axiosPublic = useAxios();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // To toggle "No data found" message

  // Location State
  const { districts, upazilas, isLoading: isLocationsLoading } = useLocations();

  const { register, handleSubmit, control } = useForm();
  const selectedDistrict = useWatch({ control, name: "district" });

  // Filter Upazilas
  const currentDistrict = districts.find((d) => d.name === selectedDistrict);
  const filteredUpazilas = currentDistrict
    ? upazilas.filter((u) => u.district_id === currentDistrict.id)
    : [];

  // Search Donors function
  const onSubmit = async (data) => {
    setLoading(true);
    setHasSearched(true);
    try {
      // Construct query string using params for auto-encoding (fixes 'B+' issue)
      const res = await axiosPublic.get("/search-donors", {
        params: {
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila,
        },
      });
      setDonors(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isLocationsLoading) {
    return (
      <div className="flex justify-center mt-20">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Find A Blood Donor
      </h2>

      {/* Search Form */}
      <Card className="mb-10 shadow-lg bg-slate-50 dark:bg-slate-900 border-none">
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            {/* Blood Group */}
            <div className="space-y-2">
              <Label className="font-bold">Blood Group</Label>
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* District */}
            <div className="space-y-2">
              <Label className="font-bold">District</Label>
              <Controller
                name="district"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((d) => (
                          <SelectItem key={d.id} value={d.name}>
                            {d.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Upazila */}
            <div className="space-y-2">
              <Label className="font-bold">Upazila</Label>
              <Controller
                name="upazila"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedDistrict}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedDistrict ? "Select Upazila" : "Select District First"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredUpazilas
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((u) => (
                          <SelectItem key={u.id} value={u.name}>
                            {u.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Search Button */}
            <Button type="submit" className="w-full font-bold">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div>
        {loading ? (
          <div className="flex justify-center">
            <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
          </div>
        ) : (
          <>
            {hasSearched && donors.length === 0 && (
              <div className="text-center text-muted-foreground text-xl">
                No donors found matching your criteria.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => (
                <Card
                  key={donor._id}
                  className="hover:border-red-400 transition duration-300"
                >
                  <CardContent className="p-6 flex flex-row gap-4 items-center">
                    <Avatar className="h-16 w-16 border-2 border-red-100">
                      <AvatarImage src={donor.avatar} alt={donor.name} />
                      <AvatarFallback>{donor.name?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <h2 className="text-lg font-bold">{donor.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {donor.district}, {donor.upazila}
                      </p>
                      <Badge variant="destructive" className="mt-2 text-white font-bold">
                        {donor.bloodGroup}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
