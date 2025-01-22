import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

function usePremiumeUser() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["userPremiume"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/users/user/premiume/${user.email}`
      );
      return data.premiumeUser;
    },
  });
  return { premiumeUser: data, isLoading };
}

export default usePremiumeUser;
