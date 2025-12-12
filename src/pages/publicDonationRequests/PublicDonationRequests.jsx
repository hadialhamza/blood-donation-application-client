import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  MapPin,
  Calendar,
  Clock,
  Droplet,
  Activity,
  ArrowRight,
  HeartPulse,
  User,
} from "lucide-react";
import Loading from "@/components/shared/Loading";
import useAxios from "../../hooks/useAxios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Container from "@/components/container/Container";

const getBloodGroupStyles = (group) => {
  const normalizedGroup = group ? group.toUpperCase() : "";

  if (normalizedGroup.includes("A") && !normalizedGroup.includes("B")) {
    return {
      tint: "from-red-500/30 via-white/0 to-white/0 dark:from-red-900/30 dark:via-black/0 dark:to-black/0",
      border: "border-red-200/50 dark:border-red-800/30",
      badgeBg: "bg-red-100/80 dark:bg-red-900/50",
      textColor: "text-red-700 dark:text-red-300",
      btnHover: "hover:bg-red-500",
    };
  } else if (normalizedGroup.includes("B") && !normalizedGroup.includes("A")) {
    return {
      tint: "from-purple-500/30 via-white/0 to-white/0 dark:from-purple-900/30 dark:via-black/0 dark:to-black/0",
      border: "border-purple-200/50 dark:border-purple-800/30",
      badgeBg: "bg-purple-100/80 dark:bg-purple-900/50",
      textColor: "text-purple-700 dark:text-purple-300",
      btnHover: "hover:bg-purple-500",
    };
  } else if (normalizedGroup.includes("O")) {
    return {
      tint: "from-blue-500/30 via-white/0 to-white/0 dark:from-blue-900/30 dark:via-black/0 dark:to-black/0",
      border: "border-blue-200/50 dark:border-blue-800/30",
      badgeBg: "bg-blue-100/80 dark:bg-blue-900/50",
      textColor: "text-blue-700 dark:text-blue-300",
      btnHover: "hover:bg-blue-500",
    };
  } else if (normalizedGroup.includes("AB")) {
    return {
      tint: "from-orange-500/30 via-white/0 to-white/0 dark:from-orange-900/30 dark:via-black/0 dark:to-black/0",
      border: "border-orange-200/50 dark:border-orange-800/30",
      badgeBg: "bg-orange-100/80 dark:bg-orange-900/50",
      textColor: "text-orange-700 dark:text-orange-300",
      btnHover: "hover:bg-orange-500",
    };
  } else {
    return {
      tint: "from-gray-500/30 via-white/0 to-white/0 dark:from-gray-900/30 dark:via-black/0 dark:to-black/0",
      border: "border-gray-200/50 dark:border-gray-800/30",
      badgeBg: "bg-gray-100/80 dark:bg-gray-900/50",
      textColor: "text-gray-700 dark:text-gray-300",
      btnHover: "hover:bg-gray-500",
    };
  }
};

const PublicDonationRequests = () => {
  const api = useAxios();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["public-requests"],
    queryFn: async () => {
      const res = await api.get("donation-requests");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-24 relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-badge">
            <Activity className="w-4 h-4 text-red-500 animate-pulse" /> Live
            Dashboard
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Donation{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-600">
              Requests
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Real-time list of people around you who need blood urgently. Your
            response can save a life today.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-8 rounded-3xl backdrop-blur-xl bg-white/30 dark:bg-black/40 border border-white/20 dark:border-white/5 text-center">
            <div className="w-24 h-24 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 backdrop-blur-md shadow-inner">
              <HeartPulse className="w-12 h-12 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              No active requests
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
              There are currently no pending donation requests. Please check
              back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requests.map((req) => {
              const styles = getBloodGroupStyles(req.bloodGroup);

              return (
                <Card
                  key={req._id}
                  className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                           backdrop-blur-xl bg-white/30 dark:bg-black/40 
                           border ${styles.border} flex flex-col h-full`}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${styles.tint} opacity-40 pointer-events-none`}
                  ></div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-tr from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full pointer-events-none z-20"></div>

                  <CardContent className="pt-8 px-8 pb-4 grow relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          <User className="w-3.5 h-3.5" /> Recipient
                        </div>
                        <h3
                          className="text-xl font-bold text-zinc-900 dark:text-white line-clamp-1 leading-tight"
                          title={req.recipientName}
                        >
                          {req.recipientName}
                        </h3>
                      </div>

                      <div
                        className={`grow-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shadow-sm backdrop-blur-md border border-white/20 ${styles.badgeBg} ${styles.textColor}`}
                      >
                        <Droplet className="w-4 h-4 fill-current mb-0.5" />
                        <span className="text-lg leading-none">
                          {req.bloodGroup}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-white/40 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                        <MapPin
                          className={`w-4 h-4 mt-0.5 shrink-0 ${styles.textColor}`}
                        />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Location
                          </span>
                          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 line-clamp-2 leading-snug">
                            {req.recipientUpazila}, {req.recipientDistrict}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/40 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                          <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            {req.donationDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/40 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                          <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            {req.donationTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-8 pb-8 pt-4 relative z-10">
                    <Link
                      to={`/dashboard/donation-request-details/${req._id}`}
                      className="w-full"
                    >
                      <Button
                        className={`w-full h-12 rounded-xl font-bold transition-all duration-300
                                       bg-zinc-900/80 dark:bg-white/90 text-white dark:text-zinc-900 
                                       backdrop-blur-md border border-white/10
                                       ${styles.btnHover} dark:hover:text-white
                                       group-hover:shadow-lg`}
                      >
                        View Full Details{" "}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default PublicDonationRequests;
