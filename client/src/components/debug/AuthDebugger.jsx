import { useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const AuthDebugger = () => {
  const { user, userRole, forceRoleRefresh } = useContext(AuthContext);
  
  useEffect(() => {
    console.log('Current Auth State:', {
      email: user?.email,
      firebaseUid: user?.uid,
      frontendRole: userRole,
      userObjectRole: user?.role,
      token: localStorage.getItem('access-token')
    });
  }, [user, userRole]);

  return (
    <button 
      onClick={async () => {
        const role = await forceRoleRefresh();
        console.log('Force refreshed role:', role);
      }}
      className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded z-50"
    >
      Debug Role
    </button>
  );
};

export default AuthDebugger;