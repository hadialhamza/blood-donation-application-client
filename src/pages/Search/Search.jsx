import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useAxios from "../../hooks/useAxios";
import { Loader2 } from "lucide-react";
import Loading from "@/components/shared/Loading";
import useLocations from "../../hooks/useLocations";
import {
  Search as SearchIcon,
  MapPin,
  Droplets,
  Users,
  Heart,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Filter,
  UserCheck,
  ChevronRight,
  Download,
} from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Search = () => {
  const axiosPublic = useAxios();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchStats, setSearchStats] = useState({
    total: 0,
    available: 0,
    urgent: 0,
  });

  // Location State
  const { districts, allUpazilas, isLoading: isLocationsLoading } = useLocations();

  const { handleSubmit, control, setValue, getValues } = useForm();
  const selectedDistrict = useWatch({ control, name: "district" });

  // Filter Upazilas
  const currentDistrict = districts.find((d) => d.name === selectedDistrict);
  const filteredUpazilas = currentDistrict
    ? allUpazilas.filter((u) => u.district_id === currentDistrict.id)
    : [];

  // Search Donors function
  const onSubmit = async (data) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await axiosPublic.get("/search-donors", {
        params: {
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila,
        },
      });
      setDonors(res.data);
      // Calculate stats
      const total = res.data.length;
      const available = res.data.filter((d) => d.status === "active").length;
      const urgent = res.data.filter(
        (d) =>
          d.lastDonation &&
          new Date() - new Date(d.lastDonation) > 30 * 24 * 60 * 60 * 1000
      ).length;
      setSearchStats({ total, available, urgent });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Quick blood group buttons
  const quickBloodGroups = ["A+", "B+", "O+", "AB+"];

  // PDF Download Handler
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(220, 38, 38); // Red color
    doc.text("BloodLine - Donor Search Results", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
      14,
      28
    );

    // Search Criteria
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(
      `Search Criteria: Blood Group: ${getValues("bloodGroup") || "All"
      }, District: ${getValues("district") || "All"}, Upazila: ${getValues("upazila") || "All"
      }`,
      14,
      38
    );

    // Table Data
    const tableData = donors.map((donor) => [
      donor.name,
      donor.bloodGroup,
      donor.status === "active" ? "Available" : "Unavailable",
      `${donor.district}, ${donor.upazila}`,
      donor.phone || "N/A",
      donor.email || "N/A",
      donor.lastDonation
        ? new Date(donor.lastDonation).toLocaleDateString()
        : "First Time",
    ]);

    autoTable(doc, {
      startY: 45,
      head: [
        [
          "Name",
          "Blood Group",
          "Status",
          "Location",
          "Phone",
          "Email",
          "Last Donation",
        ],
      ],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [220, 38, 38], textColor: 255 },
      styles: { fontSize: 8 },
    });

    doc.save("bloodline-donor-results.pdf");
  };

  if (isLocationsLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 mb-6">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
            Find Life-Saving Help
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
          Search for{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-rose-600">
            Blood Donors
          </span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Find compatible blood donors in your area. Our network connects
          thousands of verified donors ready to help in emergencies.
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-12 border-red-100 dark:border-red-900 shadow-2xl">
        <CardHeader className="bg-linear-to-r from-red-600 to-rose-600 text-white p-4 shadow-lg">
          <CardTitle className="flex items-center gap-3">
            <SearchIcon className="w-6 h-6" />
            Find Compatible Donors
          </CardTitle>
          <p className="text-red-100 text-sm font-normal">
            Select criteria to search for available donors in your area
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Quick Blood Group Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Quick Select Blood Group
              </Label>
              <div className="flex flex-wrap gap-3">
                {quickBloodGroups.map((group) => (
                  <Button
                    key={group}
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setValue("bloodGroup", group);
                    }}
                    className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Droplets className="w-4 h-4 mr-2" />
                    {group}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blood Group */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-red-600" />
                  Blood Group
                </Label>
                <Controller
                  name="bloodGroup"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-12 border-red-200 dark:border-red-800">
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+ (Most Common)</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">
                          AB+ (Universal Recipient)
                        </SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O- (Universal Donor)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* District */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  District
                </Label>
                <Controller
                  name="district"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-12 border-red-200 dark:border-red-800">
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
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Upazila
                </Label>
                <Controller
                  name="upazila"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedDistrict}
                    >
                      <SelectTrigger className="h-12 border-red-200 dark:border-red-800">
                        <SelectValue
                          placeholder={
                            selectedDistrict
                              ? "Select Upazila"
                              : "Select District First"
                          }
                        />
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
                {!selectedDistrict && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Please select a district first
                  </p>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full md:w-auto min-w-[200px] bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white h-12 px-8"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <SearchIcon className="w-5 h-5 mr-2" />
                    Search Donors
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Stats Banner */}
      {hasSearched && (
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-red-100 dark:border-red-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Total Found
                  </p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {searchStats.total}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Compatible donors
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Users className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100 dark:border-red-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Available Now
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {searchStats.available}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Active donors
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <UserCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100 dark:border-red-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Urgent Need
                  </p>
                  <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                    {searchStats.urgent}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Critical matches
                  </p>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Available Donors {hasSearched && `(${donors.length})`}
          </h2>
          {hasSearched && donors.length > 0 && (
            <Badge className="bg-linear-to-r from-green-600 to-emerald-600 text-white">
              <Filter className="w-3 h-3 mr-1" />
              {donors.length} Results
            </Badge>
          )}
          {hasSearched && donors.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="ml-auto border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <Loader2 className="animate-spin text-5xl text-red-600 dark:text-red-400" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
            </div>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Searching for donors...
            </p>
          </div>
        ) : (
          <>
            {hasSearched && donors.length === 0 && (
              <Card className="border-red-100 dark:border-red-900">
                <CardContent className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>
                    <Users className="w-24 h-24 text-zinc-300 dark:text-zinc-700 mx-auto relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                    No donors found
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
                    We couldn't find any donors matching your criteria. Try
                    expanding your search area or check back later.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Reset form logic here
                      }}
                      className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
                    >
                      Clear Filters
                    </Button>
                    <Button className="bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700">
                      Request Emergency Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {donors.map((donor) => (
                <Card
                  key={donor._id}
                  className="group border-red-100 dark:border-red-900 
                    hover:border-red-300 dark:hover:border-red-700 hover:shadow-xl 
                    transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-red-500 to-rose-500" />
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Avatar & Blood Group */}
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-20 w-20 border-4 border-white dark:border-zinc-800 shadow-lg">
                            <AvatarImage src={donor.avatar} alt={donor.name} />
                            <AvatarFallback className="text-2xl font-bold bg-linear-to-r from-red-600 to-rose-600 text-white">
                              {donor.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-2 -right-2">
                            <Badge className="bg-linear-to-r from-red-600 to-rose-600 text-white px-3 py-1">
                              <Droplets className="w-3 h-3 mr-1" />
                              {donor.bloodGroup}
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          className={`px-3 py-1 ${donor.status === "active"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                            }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${donor.status === "active"
                                ? "bg-green-500 animate-pulse"
                                : "bg-amber-500"
                              }`}
                          />
                          {donor.status === "active"
                            ? "Available"
                            : "Recently Donated"}
                        </Badge>
                      </div>

                      {/* Donor Info */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            {donor.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            <MapPin className="w-4 h-4" />
                            {donor.district}, {donor.upazila}
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                              <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Last Donation
                              </p>
                              <p className="text-sm font-medium">
                                {donor.lastDonation
                                  ? new Date(
                                    donor.lastDonation
                                  ).toLocaleDateString()
                                  : "First time"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                              <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Total Donations
                              </p>
                              <p className="text-sm font-medium">
                                {donor.totalDonations || 0}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Request Contact
                          </Button>
                          <Button
                            size="sm"
                            className="bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Emergency Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-linear-to-r from-red-600 to-rose-700 text-white shadow-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Need Urgent Help?</h3>
          <p className="text-red-100 mb-8">
            If you can't find a donor here, our emergency team is available 24/7
            to help coordinate urgent blood donations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-red-50 rounded-full px-8 py-6 text-lg font-semibold">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Hotline
            </Button>
            <Button
              variant="primary"
              className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
            >
              Request Emergency Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
