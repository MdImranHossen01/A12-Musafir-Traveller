import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

// Create context
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access-token") || null);

  // Clear auth state
  const clearAuth = useCallback(() => {
    localStorage.removeItem("access-token");
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  // Create user
  const createUser = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Create user error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email/password
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Sign in error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const googleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Google sign in error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Password reset error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = useCallback(async () => {
    try {
      setLoading(true);
      await signOut(auth);
      clearAuth();
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [clearAuth]);

  // Update profile
  const updateUserProfile = async (name, photo) => {
    try {
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      setUser((prev) => ({
        ...prev,
        displayName: name,
        photoURL: photo,
      }));
    } catch (error) {
      console.error("Profile update error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data from backend
  const fetchUserData = useCallback(async (currentUser) => {
    try {
      // Get JWT token
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: currentUser.email },
        { 
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      if (!data?.token) {
        throw new Error("No token received");
      }

      localStorage.setItem("access-token", data.token);
      setToken(data.token);

      // Fetch complete user data including role
      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${currentUser.email}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        }
      );

      if (userResponse.data) {
        const updatedUser = {
          ...currentUser,
          role: userResponse.data.role,
          dbData: userResponse.data
        };
        setUser(updatedUser);
        return updatedUser;
      }
    } catch (error) {
      console.error("User data fetch error:", error);
      await logOut();
      throw error;
    }
  }, [logOut]);

  // Check token expiration
  const checkTokenExpiration = useCallback(() => {
    const storedToken = localStorage.getItem("access-token");
    if (!storedToken) return false;

    try {
      const decoded = JSON.parse(atob(storedToken.split('.')[1]));
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        console.log("Token expired - logging out");
        logOut();
      }
      return isExpired;
    } catch (e) {
      console.error("Token decode error:", e);
      return true;
    }
  }, [logOut]);

  // Observe auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Check if token exists and is valid
          const tokenExpired = checkTokenExpiration();
          
          if (!tokenExpired) {
            // Fetch fresh user data if needed
            const updatedUser = await fetchUserData(currentUser);
            setUser(updatedUser || currentUser);
          }
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Auth state error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchUserData, clearAuth, checkTokenExpiration]);

  // Auto-check token expiration periodically
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  const authInfo = {
    user,
    loading,
    error,
    token,
    setError,
    createUser,
    signIn,
    googleSignIn,
    resetPassword,
    logOut,
    updateUserProfile,
    checkTokenExpiration,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;