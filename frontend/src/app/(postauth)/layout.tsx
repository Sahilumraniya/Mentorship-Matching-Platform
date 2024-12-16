"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import restApp, { accessTokenService, authCookieName, cookieStorage, notificationService } from "@/api/rest.app";
import { login, logout } from "@/redux/authSlice";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import MobileNavbar from "@/components/MobileNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationIcon from "@/components/NotificationIcon";

export default function PostAuthLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchNotifications = async () => {
    if (!userId) return; // Avoid fetching if userId is not set
    try {
      const res = await notificationService.find({
        query: {
          receiver_id: userId,
          $limit: 5,
          $sort: { createdAt: -1 },
          $eager: "[sender]",
        },
      });
      setNotifications(res.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(authCookieName) || cookieStorage.getItem(authCookieName);
    if (token && token !== "undefined") {
      accessTokenService
        .find({
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          if (res) {
            const userData = res.user;
            localStorage.setItem(authCookieName, res.accessToken);
            cookieStorage.setItem(authCookieName, res.accessToken);
            restApp.reAuthenticate();
            setUserId(userData.id); // Set userId in state
            setIsAuthenticated(true);
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        })
        .catch(() => {
          router.push("/login");
          dispatch(logout());
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      router.push("/login");
      setLoading(false);
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (isAuthenticated) fetchNotifications();
  }, [isAuthenticated, userId]);

  if (loading) return <Loader />;

  return (
    <div className="flex overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Mobile Navbar */}
        <MobileNavbar notifications={notifications} />

        {/* Main Content */}
        <div className="p-4 flex-1 max-h-screen overflow-y-auto">
          <div className="hidden absolute md:flex items-end justify-end p-4 md:right-12 md:top-4 z-50">
            <NotificationIcon notifications={notifications} />
          </div>
          {children}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
