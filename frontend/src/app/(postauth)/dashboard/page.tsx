"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEnvelope, faChalkboardTeacher, faUserGraduate, faBell } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';

const Dashboard: React.FC = () => {
    // Dummy data for demonstration purposes
    const userStats = {
        totalUsers: { value: 1200, icon: faUsers, label: 'Total Users' },
        mentorshipRequests: { value: 15, icon: faEnvelope, label: 'Mentorship Requests' },
        mentors: { value: 5, icon: faChalkboardTeacher, label: 'Mentors' },
        mentees: { value: 10, icon: faUserGraduate, label: 'Mentees' },
    };

    const recentActivities = [
        { id: 1, message: 'John Doe sent a mentorship request.', time: '2 minutes ago' },
        { id: 2, message: 'Jane Smith accepted your mentorship request.', time: '10 minutes ago' },
        { id: 3, message: 'You have a new message from Alex.', time: '30 minutes ago' },
    ];

    const notifications = [
        'You have 3 new notifications.',
        'Your mentorship request was accepted.',
        'New message from a mentor.',
    ];

    return (
        <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
            <div className="w-full max-w-6xl p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 ">Dashboard</h1>
                <p>* This data is dummy</p>
                <p className="text-gray-600 mb-4 text-center">
                    Welcome to the Mentorship Platform! Here you can track your mentorship activities, manage requests, and connect with mentors and mentees.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* User Statistics Cards */}
                    {Object.entries(userStats).map(([key, { value, icon, label }]) => (
                        <div
                            key={key}
                            className="bg-white p-6 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105 duration-300 ease-in-out"
                            title={label} // Tooltip for additional context
                        >
                            <FontAwesomeIcon
                                icon={icon}
                                className="text-blue-500 text-4xl mr-4"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{label}</h2>
                                <CountUp start={0} end={value} duration={1} className='text-3xl font-bold text-gray-800' />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activities */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
                    <ul>
                        {recentActivities.map(activity => (
                            <li
                                key={activity.id}
                                className="border-b py-3 flex justify-between transition-colors duration-300 hover:bg-gray-100"
                            >
                                <span className="text-gray-700">{activity.message}</span>
                                <span className="text-gray-500 text-sm">{activity.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Notifications */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faBell} className="text-yellow-500 mr-2" />
                        Notifications
                    </h2>
                    <ul>
                        {notifications.map((notification, index) => (
                            <li
                                key={index}
                                className="border-b py-3 transition-colors duration-300 hover:bg-gray-100"
                            >
                                {notification}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;