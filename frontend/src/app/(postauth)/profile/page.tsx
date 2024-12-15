"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileForm from '@/components/ProfileForm';
import Modal from '@/components/Model';
import { profileService } from '@/api/rest.app';
import Image from 'next/image';

const ProfilePage: React.FC = () => {
    const user = useSelector((state: any) => state.auth.userData);
    const [profileData, setProfileData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Refetch profile data after closing the modal
        fetchProfile();
    };

    const fetchProfile = async () => {
        try {
            // Fetch user profile data from the API
            // console.log("UPADE :user ::", user);
            const data = await profileService.find({
                query: {
                    user_id: user.id
                }
            }).then((res: any) => res.data[0]);
            // console.log("data ::", data);
            setProfileData(() => data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const getInitials = (name: string) => {
        const nameParts = name.split(' ');
        const initials = nameParts.map((part: string) => part.charAt(0).toUpperCase()).join('');
        return initials;
    };

    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar Section */}
                <div className="w-64 bg-white shadow-lg p-6">
                    <div className="flex justify-center items-center mb-6">
                        {/* If no profile picture, show initials in an SVG */}
                        {profileData?.profile_picture ? (
                            <Image
                                src={profileData?.profile_picture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                                width={96}
                                height={96}
                            />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" className="w-24 h-24">
                                <circle cx="48" cy="48" r="48" fill="#4C51BF" />
                                <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="32" dy=".3em">
                                    {getInitials(user?.name || "U")}
                                </text>
                            </svg>
                        )}
                    </div>
                    <h2 className="text-xl font-semibold text-center text-gray-800">{user?.name}</h2>
                    <p className="text-sm text-center text-gray-500">{user?.role || "User"}</p>
                    <button
                        onClick={handleEditClick}
                        className="w-full bg-blue-600 text-white py-2 px-4 mt-6 rounded-lg hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Main Profile Content Section */}
                <div className="flex-1 p-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Profile Overview</h2>

                    {/* Bio Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700">About Me</h3>
                        <p className="text-gray-600">{profileData?.bio || "No bio available"}</p>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
                        <div className="flex flex-wrap space-x-2">
                            {profileData?.skills?.length > 0 ? (
                                profileData?.skills.map((skill: string, index: number) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold rounded-full px-3 py-1">
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500">No skills added yet.</span>
                            )}
                        </div>
                    </div>

                    {/* Interests Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700">Interests</h3>
                        <div className="flex flex-wrap space-x-2">
                            {profileData?.interests?.length > 0 ? (
                                profileData?.interests.map((interest: string, index: number) => (
                                    <span key={index} className="bg-green-100 text-green-800 text-sm font-semibold rounded-full px-3 py-1">
                                        {interest}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500">No interests added yet.</span>
                            )}
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700">Contact Information</h3>
                        <p className="text-gray-600">{profileData?.contact || "No contact information available."}</p>
                    </div>

                    {/* Additional Info */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700">Additional Info</h3>
                        <p className="text-gray-600">{profileData?.additional_info || "No additional information provided."}</p>
                    </div>
                </div>
            </div>

            {/* Modal for Editing Profile */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ProfileForm profileData={profileData} OnClose={handleCloseModal} />
            </Modal>
        </>
    );
};

export default ProfilePage;
