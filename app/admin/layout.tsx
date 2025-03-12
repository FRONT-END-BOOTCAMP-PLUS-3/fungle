import AdminSidebar from "./components/AdminSidebar";
import "../globals.css";
import AuthInitializer from "@/components/authInitializer/AuthInitializer";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="admin-container">
        <AuthInitializer />
        <AdminSidebar />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
