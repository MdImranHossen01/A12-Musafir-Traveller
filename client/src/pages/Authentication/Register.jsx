import React, { useContext, useState } from 'react';
// FIX: Corrected import to use 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import Lottie from 'lottie-react';
import signupAnimation from '../../assets/signup-animation.json';

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn, logOut, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // Create the user object with all required fields
                        const saveUser = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL, // <-- FIX: Added photoURL from form
                            role: 'tourist'
                        };
                        axios.post(`${import.meta.env.VITE_API_URL}/users`, saveUser)
                            .then(res => {
                                if(res.data.insertedId){
                                    toast.success('Registration Successful! Please log in.');
                                    logOut();
                                    navigate('/login');
                                }
                            })
                            .catch(err => {
                                toast.error("Error saving user to database.");
                                setLoading(false);
                            });
                    })
                    .catch(err => {
                        toast.error(err.message);
                        setLoading(false);
                    });
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
                const saveUser = {
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    photoURL: loggedInUser.photoURL, // <-- FIX: Added photoURL from Google
                    role: 'tourist'
                };
                axios.post(`${import.meta.env.VITE_API_URL}/users`, saveUser)
                    .then(() => {
                        toast.success('Google Sign-In Successful!');
                        navigate('/');
                    });
            })
            .catch(err => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="hidden md:flex w-1/2 bg-primary/10 p-8 flex-col justify-center items-center">
                    <Lottie animationData={signupAnimation} loop={true} style={{ height: 400 }} />
                    <h2 className="text-2xl font-bold mt-4 text-center text-gray-700">Join Our Community of Explorers</h2>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                    <p className="text-gray-600 mb-6">Let's get you started on your next journey!</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Full Name</label>
                            <input {...register("name", { required: "Full name is required" })} type="text" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="John Doe" />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Photo URL</label>
                            <input {...register("photoURL", { required: "Photo URL is required" })} type="url" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://example.com/photo.jpg" />
                            {errors.photoURL && <p className="text-xs text-red-500 mt-1">{errors.photoURL.message}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Email Address</label>
                            <input {...register("email", { required: "Email is required" })} type="email" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])/, message: "Password must have an uppercase letter and a special character" }
                                })}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Create a strong password"
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-9 cursor-pointer">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <button type="submit" disabled={loading} className="w-full btn btn-primary text-white">
                                {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    <div className="divider my-4">OR</div>

                    <button onClick={handleGoogleSignIn} disabled={loading} className="w-full btn btn-outline border-gray-300">
                        <FaGoogle className="text-red-500" /> Sign Up with Google
                    </button>

                    <p className="text-center mt-4 text-gray-600">
                        Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;