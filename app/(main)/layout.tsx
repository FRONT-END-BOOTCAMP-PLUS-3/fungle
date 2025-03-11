import AuthInitializer from "@/components/authInitializer/AuthInitializer";
import Header from "@/components/header/Header";
import "../globals.css";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <AuthInitializer />
      <Header />
      {children}
    </div>
  );
};

export default DefaultLayout;
