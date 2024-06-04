import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading, error } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/user/${user?.email}`);
        return data.role;
      } catch (error) {
        throw new Error('Failed to fetch role');
      }
    },
  });

  if (error) {
    console.error('Error fetching role:', error);
  }

  return [roleData, isLoading];
};

export default useRole;
