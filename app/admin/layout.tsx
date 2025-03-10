"use client";

import AdminSidebar from "./components/AdminSidebar";
import "../globals.css";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
