
import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useAuthStore } from "@/lib/store";

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">SecurBank</h1>
          <p className="mt-2 text-muted-foreground">
            Secure banking solutions for everyone
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
