"use client";

import AdminSidebar from "./components/AdminSidebar";
import "../globals.css";
import AuthInitializer from "@/components/authInitializer/AuthInitializer";
import { AdminLayoutContainer } from "./AdminPage.styled";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminLayoutContainer>
      <AuthInitializer />
      <AdminSidebar />
      {children}
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
