import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useLocations = () => {
  const api = useAxios();

  const { data: districts = [], isLoading: isDistrictsLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await api.get("/districts");
      return res.data?.[0]?.data || [];
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: upazilas = [], isLoading: isUpazilasLoading } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await api.get("/upazilas");
      return res.data?.[0]?.data || [];
    },
    enabled: districts.length > 0 && !isDistrictsLoading,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    districts,
    upazilas,
    isLoading:
      isDistrictsLoading ||
      isUpazilasLoading ||
      (districts.length > 0 && upazilas.length === 0),
  };
};

export default useLocations;
