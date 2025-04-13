
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // If user is admin, redirect to admin dashboard
    if (currentUser?.role === "admin") {
      navigate("/admin/analytics");
    } else {
      // Regular users go to user dashboard
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  // This page acts as a router - it shouldn't render anything
  return null;
};

export default Index;
