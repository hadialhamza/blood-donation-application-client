import { districts, upazilas } from "@/data/locations";
import { useState } from "react";

const useLocations = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const filteredUpazilas = selectedDistrict
    ? upazilas.filter((upazila) => upazila.district_id === selectedDistrict)
    : [];

  return {
    districts,
    upazilas: filteredUpazilas,
    allUpazilas: upazilas,
    selectedDistrict,
    setSelectedDistrict,
  };
};

export default useLocations;
