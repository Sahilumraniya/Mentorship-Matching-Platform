import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBell, faEnvelope, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
    // Dummy data for demonstration purposes
    const userStats = {
        totalUsers: 1200, // Total number of users
        activeUsers: 300, // Number of active users
        mentorshipRequests: 15, // Number of mentorship requests
    };

    const recentActivities = [
        { id: 1, message: 'John Doe sent a mentorship request.', time: '2 minutes ago' },
        { id: 2, message: 'Jane Smith accepted your mentorship request.', time: '10 minutes ago' },
        { id: 3, message: 'You have a new message from Alex.', time: '30 minutes ago' },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-4">* This is dummy data for demonstration purposes only.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* User Statistics Cards */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Users</h2>
                    <p className="text-2xl">{userStats.totalUsers}</p>
                    <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-3xl" />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Active Users</h2>
                    <p className="text-2xl">{userStats.activeUsers}</p>
                    <FontAwesomeIcon icon={faUsers} className="text-green-500 text-3xl" />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Mentorship Requests</h2>
                    <p className="text-2xl">{userStats.mentorshipRequests}</p>
                    <FontAwesomeIcon icon={faEnvelope} className="text-orange-500 text-3xl" />
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
                <ul>
                    {recentActivities.map(activity => (
                        <li key={activity.id} className="border-b py-2">
                            <span>{activity.message}</span>
                            <span className="text-gray-500 text-sm ml-2">{activity.time}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Notifications */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Notifications</h2>
                <ul>
                    <li className="border-b py-2">You have 3 new notifications.</li>
                    <li className="border-b py-2">Your mentorship request was accepted.</li>
                    <li className="border-b py-2">New message from a mentor.</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;