"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page: React.FC = () => {
    const [testimonials, setTestimonials] = useState([
        {
            name: "John Doe",
            role: "Mentee",
            feedback: "This platform helped me find a mentor who guided me through my career transition!",
        },
        {
            name: "Jane Smith",
            role: "Mentor",
            feedback: "I love sharing my knowledge and helping others grow. This platform makes it easy!",
        },
        {
            name: "Alice Johnson",
            role: "Mentee",
            feedback: "The community is supportive, and I found the perfect mentor for my needs.",
        },
        // Add more testimonials for infinite scrolling
        {
            name: "Bob Brown",
            role: "Mentor",
            feedback: "Mentoring is a rewarding experience, and this platform makes it seamless.",
        },
        {
            name: "Emily White",
            role: "Mentee",
            feedback: "I gained so much insight from my mentor. Highly recommend this platform!",
        },
        {
            name: "Michael Green",
            role: "Mentee",
            feedback: "The matching process was quick and effective. I found a great mentor!",
        },
        // Add more testimonials as needed
    ]);

    const [visibleTestimonials, setVisibleTestimonials] = useState(3);

    const loadMoreTestimonials = () => {
        setVisibleTestimonials((prev) => Math.min(prev + 3, testimonials.length));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                loadMoreTestimonials();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <header className="bg-white shadow-lg w-full sticky top-0 z-50">
                <nav className="container mx-auto p-4 flex justify-between items-center">
                    <h1 className="md:text-3xl text-xl font-bold text-orange-600 transition duration-300 hover:scale-105">Mentorship Platform</h1>
                    <div className="flex space-x-6">
                        <Link href="/login" className="text-orange-600 hover:text-orange-800 px-4 py-2 marker:transition duration-300">Login</Link>
                        <Link href="/register" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300">Register</Link>
                    </div>
                </nav>
            </header>

            <main className="flex flex-col items-center">
                {/* Hero Section with Background Image */}
                <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url(/images/hero.jpeg)" }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for better text visibility */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                        <motion.h2
                            className="text-4xl font-bold mb-4"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Find Your Mentor or Mentee
                        </motion.h2>
                        <motion.p
                            className="text-lg mb-8"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Connect with experienced professionals and grow your skills through mentorship.
                        </motion.p>
                        <motion.a
                            href="/register"
                            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition duration-300"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            Get Started
                        </motion.a>
                    </div>
                </section>

                {/* Additional Information Section */}
                <section className="mt-16 container mx-auto px-4 mb-10">
                    <h3 className="text-3xl font-bold text-center mb-6 text-orange-800">Why Choose Us?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold mb-2 text-orange-600">User-Friendly Interface</h4>
                            <p className="text-gray-600">Our platform is designed to be intuitive and easy to navigate, making it simple for you to connect with others.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className=" text-xl font-semibold mb-2 text-orange-600">Secure Messaging</h4>
                            <p className="text-gray-600">Communicate safely with your mentor or mentee through our secure messaging system.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold mb-2 text-orange-600">Personalized Matchmaking</h4>
                            <p className="text-gray-600">We use your preferences to suggest the best mentorship matches tailored to your needs.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="mt-16 container mx-auto px-4 mb-10">
                    <h3 className="text-3xl font-bold text-center mb-6 text-orange-800">What People Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.slice(0, visibleTestimonials).map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <p className="italic text-gray-700">"{testimonial.feedback}"</p>
                                <h4 className="font-semibold mt-4 text-orange-600">{testimonial.name}</h4>
                                <p className="text-gray-500">{testimonial.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            <footer className="mt-10 p-4 bg-white w-full">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600">© 2023 Mentorship Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default page;