"use client";
import ProfileForm from "@/components/ProfileForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserProfile: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem(process.env.NEXT_PUBLIC_COOKIENAME || "auth");

        if (!token || token === "undefined") {
            // If no valid token, redirect to home page
            router.replace("/");
        } else {
            // Check if we've already reloaded before
            const hasReloaded = localStorage.getItem("hasReloaded");

            if (!hasReloaded) {
                // If this is the first time checking, set the flag and reload the page
                localStorage.setItem("hasReloaded", "true");
                window.location.reload(); // Reload the page
            }
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.jpeg')" }}>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-3xl font-bold text-orange-800 mb-6 text-center">User Profile</h2>
                <ProfileForm />
            </div>
        </div>
    );
};

export default UserProfile;
