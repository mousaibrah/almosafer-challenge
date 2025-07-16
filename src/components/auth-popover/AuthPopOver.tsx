"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useIsFirstTime } from "@/store/useIsFirstTime";
import { ChevronDown, GithubIcon, LogOut } from "lucide-react";
import { useState } from "react";

export function AuthModal() {
  const { user, isLoading, signIn, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setIsFirstTime } = useIsFirstTime();

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        onClick={() => {
          signIn();
          setIsFirstTime(false);
        }}
        className="gap-2"
      >
        <GithubIcon className="h-4 w-4" />
        <span className="hidden xs:inline">Login with GitHub</span>
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="gap-2"
      >
        <Avatar className="h-6 w-6">
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback>
            {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <span className="hidden sm:inline">{user.name || user.email}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-md border bg-background shadow-lg">
            <div className="p-2">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || ""} alt={user.name || ""} />
                  <AvatarFallback>
                    {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-start">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="border-t mt-2 pt-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    signOut();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
