import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { authApi, type PublicUser } from "@/lib/auth-api";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: PublicUser | null;
  isCheckingSession: boolean;
  register: (input: RegisterInput) => Promise<PublicUser>;
  login: (input: LoginInput) => Promise<PublicUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<PublicUser | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  async function refreshUser() {
    try {
      const response = await authApi.me();
      setUser(response.user);
      return response.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setIsCheckingSession(false);
    }
  }

  async function register(input: RegisterInput) {
    const response = await authApi.register(input);
    setUser(response.user);
    return response.user;
  }

  async function login(input: LoginInput) {
    const response = await authApi.login(input);
    setUser(response.user);
    return response.user;
  }

  async function logout() {
    await authApi.logout();
    setUser(null);
  }

  useEffect(() => {
    void refreshUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isCheckingSession,
      register,
      login,
      logout,
      refreshUser,
    }),
    [user, isCheckingSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
