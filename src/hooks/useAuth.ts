import { useState } from "react";

const useAuth = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  const authenticate = (email: string, password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const user = storedUsers.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (user) {
      setAuthError(null);
      return true;
    } else {
      setAuthError("Invalid email or password.");
      return false;
    }
  };

  return { authenticate, authError };
};

export default useAuth;
