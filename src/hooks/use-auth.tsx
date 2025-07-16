"use client";

import { clearSessionCache } from "@/api/client";
import { AuthenticatedUser } from "@/types/github";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { createContext, ReactNode, useContext } from "react";

interface AuthContextType {
  user: AuthenticatedUser | undefined;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    clearSessionCache();
    signOut();
  };

  const value: AuthContextType = {
    user: session?.user,
    isLoading: status === "loading",
    signIn: () => signIn("github"),
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
