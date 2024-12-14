"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { login } from '@/redux/authSlice';
import restApp, { authCookieName, authenticationService, cookieStorage, userService } from '@/api/rest.app';
import Link from 'next/link';
import { toast } from 'react-toastify';

const RegistrationForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('mentee'); // Default role
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            const userData = await userService.create({
                name,
                email,
                password
            });

            // console.log("userData ::", userData);

            // If user is created successfully, proceed to login
            if (userData) {
                const session = await authenticationService.create({
                    email: userData.email,
                    password: password,
                    strategy: "local"
                });

                console.log("session ::", session);

                // If session is created successfully, store session token and update state
                if (session) {
                    localStorage.setItem(authCookieName, session.accessToken);
                    cookieStorage.setItem(authCookieName, session.accessToken);
                    await restApp.reAuthenticate();

                    // Dispatch user data to the Redux store
                    const userData = session.user;
                    dispatch(login({ userData }));

                    // Reset states
                    setName("");
                    setEmail("");
                    setPassword("");
                    setLoading(false);
                    toast.success('Registration successful!');
                    router.push('/add-more-information');
                }
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.jpeg')" }}>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-orange-800 mb-6 text-center">REGISTER</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 transform hover:scale-105"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 transform hover:scale-105"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 transform hover:scale-105"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">I want to be a:</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="mentee"
                                name="role"
                                value="mentee"
                                checked={role === 'mentee'}
                                onChange={(e) => setRole(e.target.value)}
                                className="mr-2 transform transition-transform duration-200 hover:scale-110"
                            />
                            <label htmlFor="mentee" className="mr-4 text-gray-700">Mentee</label>
                            <input
                                type="radio"
                                id="mentor"
                                name="role"
                                value="mentor"
                                checked={role === 'mentor'}
                                onChange={(e) => setRole(e.target.value)}
                                className="mr-2 transform transition-transform duration-200 hover:scale-110"
                            />
                            <label htmlFor="mentor" className="text-gray-700">Mentor</label>
                        </div>
                    </div>
                    <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300 w-full transform hover:scale-105">
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="text-center mt-10">
                    Already have an account?{' '}
                    <Link className="text-indigo-500 hover:underline" href="/login">
                        Login here
                    </Link>{' '}
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;