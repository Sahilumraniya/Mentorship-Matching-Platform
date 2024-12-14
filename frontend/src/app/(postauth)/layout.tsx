"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Loading from "@/components/Loading"; // Assuming you have a Loading component
import { useDispatch } from "react-redux";
import restApp, { accessTokenService, authCookieName, cookieStorage, notificationService, userService } from "@/api/rest.app";
import { login, logout } from "@/redux/authSlice";
// import Navbar from "../../components/Navbar";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import MobileNavbar from "@/components/MobileNavbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotificationIcon from "@/components/NotificationIcon";

export default function PostAuthLayout({ children }: Readonly<{ children: any }>) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let userId: number | null = null;
  const [notifications, setNotifications] = useState([]); // State for notifications
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchNotifications = async () => {
    try {
      if (!userId) return;
      await notificationService.find({
        query: {
          receiver_id: userId, // Assuming the user ID is 1
          $limit: 5, // Limit to 5 notifications
          $sort: { createdAt: -1 }, // Sort by createdAt in descending order
          $eager: '[sender]' // Eager load the sender's profile
        }
      }).then((res: any) => {
        setNotifications(res.data); // Assuming the response contains the notifications
      }).catch((error: any) => {
        console.error("Failed to fetch notifications:", error);
      });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(authCookieName) || cookieStorage.getItem(authCookieName);
    if (token && token !== "undefined") {
      accessTokenService.find({
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then((res: any) => {
        if (res) {
          const userData = res.user;
          // console.log("userData ::", userData);
          localStorage.setItem(authCookieName, res.accessToken);
          cookieStorage.setItem(authCookieName, res.accessToken);
          userId = userData.id;
          console.log("userId ::", userId);
          setIsAuthenticated(true);
          fetchNotifications();

          dispatch(login({ userData }));
          return restApp.reAuthenticate(); // Re-authenticate if needed
        } else {
          dispatch(logout());
        }
      }).catch(() => {
        router.push("/login"); // Redirect to login if there's an error
        dispatch(logout()); // Logout if there's an error
      }).finally(() => {
        setLoading(false); // Always set loading to false after attempts
      });
    } else {
      router.push("/login"); // Redirect to login if there's no token
      setLoading(false); // If no token, set loading to false
    }
  }, [dispatch]);

  // Fetch notifications when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  if (loading) {
    return <>
      <Loader />
    </>; // Show loading indicator while checking authentication
  }

  return <div className="flex overflow-hidden">
    {/* Desktop Sidebar */}
    <Sidebar />

    <div className="flex-1 overflow-hidden">
      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Main Content */}
      <div className="p-4 flex-1 max-h-screen overflow-y-auto">
        <div className="rlative flex items-end justify-end p-4 bg-white shadow-md">
          <NotificationIcon notifications={notifications} />
        </div>
        {children}
      </div>
    </div>
    <ToastContainer />
  </div>// Render the children (protected content) if authenticated
}
