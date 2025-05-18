
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Redirect to login if not authenticated, otherwise to dashboard
    navigate(isAuthenticated ? "/" : "/login");
  }, [isAuthenticated, navigate]);

  // This page acts as a router - it shouldn't render anything
  return null;
};

export default Index;
