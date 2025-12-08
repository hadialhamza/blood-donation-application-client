import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { TbFidgetSpinner } from "react-icons/tb";
import useLocations from "../../hooks/useLocations";

const Search = () => {
  const axiosPublic = useAxios();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // To toggle "No data found" message

  // Location State
  // Location State
  const { districts, upazilas, isLoading: isLocationsLoading } = useLocations();

  const { register, handleSubmit, watch } = useForm();
  const selectedDistrict = watch("district");



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
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Find A Blood Donor
      </h2>

      {/* Search Form */}
      <div className="bg-base-200 p-6 rounded-xl shadow-lg mb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          {/* Blood Group */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Blood Group</span>
            </label>
            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("bloodGroup", { required: true })}
            >
              <option value="" disabled>
                Select Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* District */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">District</span>
            </label>
            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("district", { required: true })}
            >
              <option value="" disabled>
                Select District
              </option>
              {districts
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Upazila</span>
            </label>
            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("upazila", { required: true })}
              disabled={!selectedDistrict}
            >
              <option value="" disabled>
                Select Upazila
              </option>
              {filteredUpazilas
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="form-control">
            <button className="btn btn-primary text-white w-full">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div>
        {loading ? (
          <div className="flex justify-center">
            <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
          </div>
        ) : (
          <>
            {hasSearched && donors.length === 0 && (
              <div className="text-center text-gray-500 text-xl">
                No donors found matching your criteria.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="card bg-base-100 shadow-xl border hover:border-red-400 transition"
                >
                  <div className="card-body flex-row gap-4 items-center">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={donor.avatar} alt={donor.name} />
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title">{donor.name}</h2>
                      <p className="text-sm text-gray-500">
                        {donor.district}, {donor.upazila}
                      </p>
                      <div className="badge badge-error text-white font-bold mt-1">
                        {donor.bloodGroup}
                      </div>
                      {/* Note: Requirements don't explicitly say to show email/phone in search, usually for privacy it's hidden or shown on contact */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
