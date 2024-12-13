// components/Sidebar.tsx

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faUsers, faHandshake, faEnvelope, faBell, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
    const user = useSelector((state: any) => state.auth.userData);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const [isMinimized, setIsMinimized] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    const currentPath = pathname;

    // Get the first letter of the user's name (uppercase)
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';

    return (
        <div className={`hidden md:flex flex-col max-h-screen transition-all duration-300 ${isMinimized ? 'w-16' : 'w-64'}`}>
            {/* User Profile Section */}
            <div className={`flex items-center px-4 py-2 ${isMinimized ? 'justify-center' : ''}`}>
                {/* Display user initial if no avatar */}
                {!isMinimized && (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full mr-3">
                        {userInitial}
                    </div>
                )}
                <h2 className={`text-lg font-semibold ${isMinimized ? 'hidden' : 'block'}`}>Welcome, {user?.name}</h2>
                <button
                    onClick={toggleSidebar}
                    className="bg-orange-600 hover:bg-orange-500 rounded p-2 mb-4 ml-auto mt-4"
                >
                    {isMinimized ? '>' : '<'}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 mt-6">
                <ul>
                    <li className="mb-2">
                        <Link href="/dashboard" className={`flex items-center p-3 hover:bg-orange-600 rounded ${currentPath === '/dashboard' ? 'bg-orange-700' : ''}`}>
                            <FontAwesomeIcon icon={faTachometerAlt} className={`mr-3 ${isMinimized ? 'text-center' : ''}`} />
                            <span className={`${isMinimized ? 'hidden' : 'block'}`}>Dashboard</span>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/profile" className={`flex items-center p-3 hover:bg-orange-600 rounded ${currentPath === '/profile' ? 'bg-orange-700' : ''}`}>
                            <FontAwesomeIcon icon={faUser} className={`mr-3 ${isMinimized ? 'text-center' : ''}`} />
                            <span className={`${isMinimized ? 'hidden' : 'block'}`}>My Profile</span>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/users" className={`flex items-center p-3 hover:bg-orange-600 rounded ${currentPath === '/users' ? 'bg-orange-700' : ''}`}>
                            <FontAwesomeIcon icon={faUsers} className={`mr-3 ${isMinimized ? 'text-center' : ''}`} />
                            <span className={`${isMinimized ? 'hidden' : 'block'}`}>Users</span>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/match-users" className={`flex items-center p-3 hover:bg-orange-600 rounded ${currentPath === '/match-users' ? 'bg-orange-700' : ''}`}>
                            <FontAwesomeIcon icon={faHandshake} className={`mr-3 ${isMinimized ? 'text-center' : ''}`} />
                            <span className={`${isMinimized ? 'hidden' : 'block'}`}>Match Users</span>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/mentorship-requests" className={`flex items-center p-3 hover:bg-orange-600 rounded ${currentPath === '/mentorship-requests' ? 'bg-orange-700' : ''}`}>
                            <FontAwesomeIcon icon={faEnvelope} className={`mr-3 ${isMinimized ? 'text-center' : ''}`} />
                            <span className={`${isMinimized ? 'hidden' : 'block'}`}>Mentorship Requests</span>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/my-mentors" className={`flex items-center p-3 hover:bg-orange-600 rounded ${currentPath === '/my-mentors' ? 'bg-orange-700' : ''}`}>
                            <FontAwesomeIcon icon={faUsers} className={`mr-3 ${isMinimized ? 'text-center' : ''}`} />
                            <span className={`${isMinimized ? 'hidden' : 'block'}`}>My Mentors</span>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/notifications" className={`flex items-center p-3 hover:bg-orange-600 rounded ${currentPath === '/notifications' ? 'bg-orange-700' : ''}`}>
                            <FontAwesomeIcon icon={faBell} className={`mr-3 ${isMinimized ? 'text-center' : ''}`} />
                            <span className={`${isMinimized ? 'hidden' : 'block'}`}>Notifications</span>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/settings" className={`flex items-center p-3 hover:bg-orange-600 rounded ${currentPath === '/settings' ? 'bg-orange-700' : ''}`}>
                            <FontAwesomeIcon icon={faCog} className={`mr-3 ${isMinimized ? 'text-center' : ''}`} />
                            <span className={`${isMinimized ? 'hidden' : 'block'}`}>Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-full flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                <span className={`${isMinimized ? 'hidden' : 'block'}`}>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;