import AdminSidebar from "./components/AdminSidebar";
import "../globals.css";
import AuthInitializer from "@/components/authInitializer/AuthInitializer";
import StyledComponentsRegistry from "../lib/registry";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="admin-container">
        <AuthInitializer />
        <AdminSidebar />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </div>
    </>
  );
};

export default AdminLayout;
