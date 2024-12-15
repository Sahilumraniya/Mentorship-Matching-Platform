"use client";

// import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_COOKIENAME || "auth");
    console.log("token ::", token);

    if (token && token !== "undefined") {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, []);

  return (<> {loader ? <Loader /> : <>{children}
    <ToastContainer position="bottom-right" />
  </>}</>);
}
