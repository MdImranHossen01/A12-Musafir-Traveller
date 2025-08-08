import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

const RoleSync = () => {
  const { user, userRole, forceRoleRefresh } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    // Verify role sync every 5 seconds
    const interval = setInterval(async () => {
      try {
        const currentRole = await forceRoleRefresh();
        console.log('Periodic role check:', currentRole);
      } catch (error) {
        console.error('Role sync error:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user?.email, forceRoleRefresh]);

  return null;
};

export default RoleSync;