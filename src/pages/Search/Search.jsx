import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Search as SearchIcon, Users, Loader2 } from "lucide-react";
import useAxios from "@/hooks/useAxios";
import Container from "@/components/shared/container/Container";
import { generateDonorPDF } from "@/utils/pdfGenerator";
import { Card } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";
import SearchForm from "./SearchForm";
import SearchResultsHeader from "./SearchResultHeader";
import SearchedDonorCard from "./SearchedDonorCard";

const Search = () => {
  const api = useAxios();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bloodGroup: "",
      district: "",
      upazila: "",
    },
  });

  const searchStats = {
    total: donors.length,
    available: donors.filter((d) => d.status === "active").length,
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await api.get("/search-donors", {
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

  const handleDownload = () => {
    const criteria = {
      bloodGroup: getValues("bloodGroup"),
      district: getValues("district"),
      upazila: getValues("upazila"),
    };
    generateDonorPDF(donors, criteria);
  };

  return (
    <Container>
      <div className="mt-20 lg:mt-32 mb-10 min-h-screen">
        <SectionHeader
          icon={SearchIcon}
          badge="Find Life-Saving Help"
          title="Search for"
          highlight="Blood Donors"
          description="Find compatible blood donors in your area. Our network connects thousands of verified donors."
        />

        {/* Search Form */}
        <SearchForm
          onSubmit={handleSubmit(onSubmit)}
          loading={loading}
          control={control}
          errors={errors}
        />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="animate-spin text-5xl text-red-600 mx-auto mb-4" />
            <p className="text-zinc-500">Scanning donor database...</p>
          </div>
        )}

        {/* Results Section */}
        {!loading && hasSearched && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SearchResultsHeader
              stats={searchStats}
              onDownload={handleDownload}
            />

            {/* Empty State */}
            {donors.length === 0 ? (
              <Card className="border-dashed border-2 border-red-100 dark:border-red-900 bg-white dark:bg-zinc-900 hover:border-red-300 dark:hover:border-red-700 transition-colors duration-300 gap-5 py-10">
                <div className="bg-white dark:bg-zinc-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-sm ring-4 ring-red-50 dark:ring-red-900/20">
                  <Users className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
                </div>
                <h3 className="text-2xl text-center font-bold text-zinc-900 dark:text-white">
                  No donors found
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                  We couldn't find donors matching{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                    {getValues("bloodGroup")}
                  </span>{" "}
                  in{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                    {getValues("district")}
                  </span>
                  .
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {donors.map((donor) => (
                  <SearchedDonorCard key={donor._id} donor={donor} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;
