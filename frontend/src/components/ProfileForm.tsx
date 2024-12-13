"use client";

import { profileService, uploadService } from '@/api/rest.app';
import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';

interface ProfileData {
    id: number;
    bio: string;
    skills: string[];
    interests: string[];
    profile_picture: File | null;
}

const ProfileForm: React.FC<{ profileData?: ProfileData, OnClose?: () => void }> = ({ profileData, OnClose }) => {
    const user = useSelector((state: any) => state.auth.userData);

    const [bio, setBio] = useState<string>(profileData?.bio || '');
    const [skills, setSkills] = useState<string[]>(profileData?.skills || []);
    const [interests, setInterests] = useState<string[]>(profileData?.interests || []);
    const [selectedFile, setSelectedFile] = useState<File | null>(profileData?.profile_picture || null);
    const [loading, setLoading] = useState(false);

    const handleSkillAdd = (skill: string) => {
        if (skill && !skills.includes(skill)) {
            setSkills([...skills, skill]);
        }
    };

    const handleSkillRemove = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleInterestAdd = (interest: string) => {
        if (interest && !interests.includes(interest)) {
            setInterests([...interests, interest]);
        }
    };

    const handleInterestRemove = (interestToRemove: string) => {
        setInterests(interests.filter(interest => interest !== interestToRemove));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ bio, skills, interests, selectedFile });
        setLoading(true);
        // Simulate API request
        try {
            if (profileData) {

                const file = selectedFile ? await uploadService.create({ fileNames: selectedFile.name }) : null;
                console.log("file ::", file);
                let fileIds = null;
                if (file && file.uploadURL != '') {
                    console.log("file q1::", file);
                    await axios.put(file.uploadURL[0].url, selectedFile, {
                        headers: {
                            'Content-Type': selectedFile?.type,
                        },
                    }).then((res) => {
                        // console.log("prod ::", product.images);
                        profileData?.profile_picture && uploadService.remove(profileData.profile_picture);
                    });
                    console.log("file ::", file);
                    fileIds = file.uploadURL.map((file: any) => {
                        // console.log("f ::", file);
                        return file.uniqueFileName
                    });
                }
                // console.log("fileIds ::", fileIds);
                const updateProfileData: any = {
                    bio,
                    skills,
                    interests,
                }

                if (file && file.uploadURL != '') {
                    updateProfileData["profile_picture"] = fileIds[0];
                }

                await profileService.patch(profileData?.id, updateProfileData).then((res: any) => {
                    console.log("res ::", res);
                });

            } else {
                const file = selectedFile ? await uploadService.create({ fileNames: selectedFile?.name }) : null;
                let fileId = null;
                if (file && file.uploadURL != '') {
                    await axios.put(file.uploadURL[0].url, selectedFile, {
                        headers: {
                            'Content-Type': selectedFile?.type,
                        },
                    });
                    fileId = file.uploadURL.map((file: any) => file.uniqueFileName);
                }
                // console.log("user ::", user);
                await profileService.create({
                    user_id: user.id,
                    bio,
                    skills,
                    interests,
                    profile_picture: (file && file.uploadURL != '') ? fileId[0] : null
                });
            }
            setLoading(false);
        } catch (error) {
            console.log("error ::", error);

        } finally {
            setLoading(false);
            if (OnClose) {
                OnClose();
            }
        }

    };

    const handleKeyDownSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            handleSkillAdd(e.currentTarget.value);
            e.currentTarget.value = '';
            e.preventDefault();
        }
    };

    const handleKeyDownInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            handleInterestAdd(e.currentTarget.value);
            e.currentTarget.value = '';
            e.preventDefault();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={user?.name}
                    disabled
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Your name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Tell us about yourself"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Skills</label>
                <input
                    type="text"
                    onKeyDown={handleKeyDownSkill}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Add a skill and press Enter"
                />
                <div className="mt-2 flex flex-wrap">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-center bg-blue-200 text-blue-800 text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded-full">
                            {skill}
                            <button
                                type="button"
                                onClick={() => handleSkillRemove(skill)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                &times; {/* This is the "remove" icon */}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Interests</label>
                <input
                    type="text"
                    onKeyDown={handleKeyDownInterest}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Add an interest and press Enter"
                />
                <div className="mt-2 flex flex-wrap">
                    {interests.map((interest, index) => (
                        <div key={index} className="flex items-center bg-green-200 text-green-800 text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded-full">
                            {interest}
                            <button
                                type="button"
                                onClick={() => handleInterestRemove(interest)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                &times; {/* This is the "remove" icon */}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <div className="flex items-center">
                    <input type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        typeof='image/*'
                        id="profile-image"
                    />
                    <label
                        htmlFor="profile-image"
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300 cursor-pointer"
                    >
                        Upload Image
                    </label>
                    {selectedFile && (
                        <span className="ml-2 text-gray-700">{selectedFile.name}</span>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Save Profile
            </button>
        </form>
    );
};

export default ProfileForm;