"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Loading from "@/components/Loading"; // Assuming you have a Loading component
import { useDispatch } from "react-redux";
import restApp, { accessTokenService, authCookieName, cookieStorage } from "@/api/rest.app";
import { login, logout } from "@/redux/authSlice";
// import Navbar from "../../components/Navbar";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import MobileNavbar from "@/components/MobileNavbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function PostAuthLayout({ children }: Readonly<{ children: any }>) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(authCookieName) || cookieStorage.getItem(authCookieName);
    console.log("token ::", token);

    if (token && token !== "undefined") {
      accessTokenService.find({
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then((res: any) => {
        if (res) {
          const userData = res.user;
          console.log("userData ::", userData);
          localStorage.setItem(authCookieName, res.accessToken);
          cookieStorage.setItem(authCookieName, res.accessToken);
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

  if (loading) {
    return <>
      <Loader />
    </>; // Show loading indicator while checking authentication
  }

  return <div className="flex overflow-hidden">
    {/* Desktop Sidebar */}
    <Sidebar />

    <div className="flex-1">
      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Main Content */}
      <div className="p-4 flex-1 max-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
    <ToastContainer />
  </div>// Render the children (protected content) if authenticated
}
