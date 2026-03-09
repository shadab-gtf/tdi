"use client";

import Header from "@/admin/components/Header";
import LeftSidebar from "@/admin/components/LeftSidebar";
import { useEffect } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import ReduxProvider from "@/redux/Provider";
import AuthInitializer from "@/admin/components/auth/AuthInitializer";
import { logout } from "@/features/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdminLayoutContentProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    document.body.className = "admin-body";
  }, []);

  return (
    <>
      {!isLoginPage && <AuthInitializer />}

      {!isLoginPage && (
        <Header
          onLogout={() => {
            dispatch(logout());
            router.replace("/admin/login");
          }}
        />
      )}

      {!isLoginPage && <LeftSidebar />}

      <main
        className={
          !isLoginPage
            ? `px-[50px] ${
                params?.id ? "ml-[80px] mr-[80px]" : "ml-[80px]"
              }`
            : ""
        }
      >
        {children}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </main>
    </>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ReduxProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ReduxProvider>
  );
}
