import React, { useContext, useState } from 'react';
// FIX: Corrected import to use 'react-router-dom'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import travelAnimation from '../../assets/login-illustration.json';
import axios from 'axios';

const Login = () => {
    const { signIn, googleSignIn, resetPassword, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                toast.success('Login Successful!');
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message.replace('Firebase: ', ''));
                setLoading(false);
            });
    };
  
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                // Create the user object with all required fields
                const saveUser = { 
                    name: loggedInUser.displayName, 
                    email: loggedInUser.email, 
                    photoURL: loggedInUser.photoURL, // <-- FIX: Added photoURL
                    role: 'tourist'
                };
                
                // Post the complete user data to the server
                axios.post(`${import.meta.env.VITE_API_URL}/users`, saveUser)
                    .then(() => {
                        toast.success('Google Sign-In Successful!');
                        navigate(from, { replace: true });
                    })
                    .catch(err => {
                        toast.error("Database error. Could not save user.");
                        setLoading(false);
                    })
            })
            .catch(err => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    const handleForgotPassword = () => {
        const email = getValues("email");
        if (!email) {
            toast.error("Please enter your email address first.");
            return;
        }
        resetPassword(email)
            .then(() => {
                toast.success("Password reset link sent! Check your email.");
                setLoading(false);
            })
            .catch(err => {
                toast.error(err.message.replace('Firebase: ', ''));
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                    <p className="text-gray-600 mb-6">Sign in to continue your journey.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                {...register("password", { required: "Password is required" })}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your password"
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-11 cursor-pointer">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        
                        <div className="text-right">
                            <span onClick={handleForgotPassword} className="text-sm text-primary hover:underline cursor-pointer">
                                Forgot Password?
                            </span>
                        </div>

                        <div>
                            <button type="submit" disabled={loading} className="w-full btn btn-primary text-white">
                                {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
                            </button>
                        </div>
                    </form>

                    <div className="divider my-6">OR</div>

                    <button onClick={handleGoogleSignIn} disabled={loading} className="w-full btn btn-outline border-gray-300">
                        <FaGoogle className="text-red-500" /> Continue with Google
                    </button>

                    <p className="text-center mt-6 text-gray-600">
                        New to TouristGuide? <Link to="/register" className="text-primary font-medium hover:underline">Create an Account</Link>
                    </p>
                </div>
                
                <div className="hidden md:flex w-1/2 bg-primary/10 p-8 flex-col justify-center items-center">
                    <Lottie animationData={travelAnimation} loop={true} style={{ height: 400 }} />
                    <h2 className="text-2xl font-bold mt-4 text-center text-gray-700">Discover Your Next Adventure</h2>
                </div>
            </div>
        </div>
    );
};

export default Login;