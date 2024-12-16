import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faTachometerAlt, faUser, faUsers, faHandshake, faEnvelope, faBell, faCog, faSignOutAlt, faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import NotificationIcon from './NotificationIcon';

const MobileNavbar: React.FC<{ notifications: any }> = ({ notifications }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMentorshipSubmenuOpen, setMentorshipSubmenuOpen] = useState(false);
    const user = useSelector((state: any) => state.auth.userData);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleMentorshipSubmenu = () => {
        setMentorshipSubmenuOpen(!isMentorshipSubmenuOpen);
    };

    // Get the first letter of the user's name (uppercase)
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';

    return (
        <div className="sm:hidden">
            {/* Mobile Navbar Header */}
            <div className="flex items-center justify-between p-4 bg-orange-500">
                <button onClick={toggleMenu} className="text-white">
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>
                <div className='flex items-center gap-4'>
                    <h2 className="text-white font-semibold">{user?.name}</h2>
                    {user && user.profile_picture ?
                        <img src={user.profile_picture} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                        : <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full mr-3">
                            {userInitial}
                        </div>}
                    <div className="flex items-end justify-end p-1">
                        <NotificationIcon notifications={notifications} />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="bg-orange-500 text-white px-4">
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
                            <button onClick={toggleMentorshipSubmenu} className={`flex items-center justify-between p-3 hover:bg-orange-600 rounded`}>
                                <div>
                                    <FontAwesomeIcon icon={faEnvelope} className={`mr-3`} />
                                    <span>Mentorship Requests</span>
                                </div>
                                <FontAwesomeIcon icon={isMentorshipSubmenuOpen ? faAnglesUp : faAnglesDown} />
                            </button>
                            {isMentorshipSubmenuOpen && (
                                <ul className="pl-6">
                                    <li className="mb-2">
                                        <Link href="/mentorship-requests/pending" className={`flex items-center p-3 hover:bg-orange-600 rounded`}>
                                            <span className={`w-full text-left`}>Pending Requests</span>
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link href="/mentorship-requests/accepted" className={`flex items-center p-3 hover:bg-orange-600 rounded`}>
                                            <span className={`w-full text-left`}>Accepted Requests</span>
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link href="/mentorship-requests/rejected" className={`flex items-center p-3 hover:bg-orange-600 rounded`}>
                                            <span className={`w-full text-left`}>Rejected Requests</span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="mb-2">
                            <Link href="/my-mentors">
                                <div className="flex items-center p-2 hover:bg-orange-700 rounded">
                                    <FontAwesomeIcon icon={faUsers} className="mr-3" />
                                    My Mentors
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
