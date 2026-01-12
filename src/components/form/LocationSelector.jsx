import React from "react";
import useLocations from "@/hooks/useLocations";
import { Controller, useWatch } from "react-hook-form";
import { Map, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocationSelector = ({ control, errors, className }) => {
  const { districts, allUpazilas } = useLocations();
  const selectedDistrict = useWatch({ control, name: "district" });

  const filteredUpazilas = React.useMemo(() => {
    if (!selectedDistrict || !districts) return [];
    const currentDistrict = districts.find((d) => d.name === selectedDistrict);
    if (!currentDistrict) return [];
    return allUpazilas.filter((u) => u.district_id === currentDistrict.id);
  }, [selectedDistrict, districts, allUpazilas]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className || ""}`}>
      {/* District Select */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Map className="w-4 h-4 text-red-600" />
          District
        </Label>
        <Controller
          name="district"
          control={control}
          rules={{ required: "District is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <SelectTrigger className="w-full h-10 text-sm border-red-200 dark:border-red-800 focus:ring-red-500 bg-white dark:bg-zinc-900">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districts
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  .map((d) => (
                    <SelectItem key={d.id} value={d.name}>
                      {d.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors?.district && (
          <span className="text-xs text-red-500">
            {errors.district.message}
          </span>
        )}
      </div>

      {/* Upazila Select */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-600" />
          Upazila
        </Label>
        <Controller
          name="upazila"
          control={control}
          rules={{ required: "Upazila is required" }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value || ""}
              disabled={!selectedDistrict}
            >
              <SelectTrigger className="w-full h-10 text-sm border-red-200 dark:border-red-800 focus:ring-red-500 bg-white dark:bg-zinc-900">
                <SelectValue placeholder="Select Upazila" />
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
        {errors?.upazila && (
          <span className="text-xs text-red-500">{errors.upazila.message}</span>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
