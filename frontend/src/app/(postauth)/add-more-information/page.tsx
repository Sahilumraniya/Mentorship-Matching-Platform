"use client";
import ProfileForm from "@/components/ProfileForm";

const UserProfile: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.jpeg')" }}>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-3xl font-bold text-orange-800 mb-6 text-center">User  Profile</h2>
                <ProfileForm />
            </div>
        </div>
    );
};

export default UserProfile;