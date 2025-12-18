import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading";
import Container from "@/components/shared/container/Container";
import ProfileHero from "./ProfileHero";
import ProfileStats from "./ProfileStats";
import ProfileImpact from "./ProfileImpact";
import ProfileAccountVerification from "./ProfileAccountVerification";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch fresh data from DB
  const { data: dbUser = {}, isLoading: isUserLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  // Fetch additional stats for donor
  const { data: userStats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ["userStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
  });

  if (isUserLoading || isStatsLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="max-w-5xl mx-auto mt-8 space-y-6">
        <ProfileHero dbUser={dbUser} user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4">
            <ProfileStats userStats={userStats} />
          </div>
          <div className="lg:col-span-4 flex items-center gap-6">
            <div className="w-1/4 h-full">
              <ProfileAccountVerification dbUser={dbUser} />
            </div>
            <div className="w-3/4">
              <ProfileImpact userStats={userStats} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
