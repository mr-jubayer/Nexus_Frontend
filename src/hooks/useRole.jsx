import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

function useRole() {
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users/user/role`);
      return data;
    },
  });
}

export default useRole;
