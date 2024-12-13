// components/MobileNavbar.tsx

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faTachometerAlt, faUser, faUsers, faHandshake, faEnvelope, faBell, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const MobileNavbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="sm:hidden">
            {/* Mobile Navbar Header */}
            <div className="flex items-center justify-between p-4 bg-orange-600">
                <button onClick={toggleMenu} className="text-white">
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>
                <h2 className="text-white font-semibold">Mobile Navbar</h2>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="bg-orange-600 text-white p-4">
                    <ul>
                        <li className="mb-2">
                            <Link href="/dashboard">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
                                    Dashboard
                                </div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/profile">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faUser} className="mr-3" />
                                    My Profile
                                </div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/users">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faUsers} className="mr-3" />
                                    Users
                                </div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/match-users">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faHandshake} className="mr-3" />
                                    Match Users
                                </div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/mentorship-requests">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                                    Mentorship Requests
                                </div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/my-mentors">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faUsers} className="mr-3" />
                                    My Mentors
                                </div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/notifications">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faBell} className="mr-3" />
                                    Notifications
                                </div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/settings">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faCog} className="mr-3" />
                                    Settings
                                </div>
                            </Link>
                        </li>
                        <li className="mt-4">
                            <Link href="/login">
                                <div className="flex items-center p-2 hover:bg-red-700 rounded">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                                    Logout
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileNavbar;
