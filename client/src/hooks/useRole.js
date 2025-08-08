import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../api/axiosSecure'; // ✅ Secure Axios instance

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure(); // ✅ Hook returns secured axios instance

    const { data: role, isLoading: isRoleLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`); // ✅ Token-protected request
            return data.role;
        },
    });

    return [role, isRoleLoading];
};

export default useRole;
