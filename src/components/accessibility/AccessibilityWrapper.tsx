"use client";

import type React from "react";

import { useEffect } from "react";

interface AccessibilityWrapperProps {
  children: React.ReactNode;
  announceResults?: boolean;
  resultCount?: number;
}

export function AccessibilityWrapper({
  children,
  announceResults = false,
  resultCount = 0,
}: AccessibilityWrapperProps) {
  useEffect(() => {
    if (announceResults && resultCount > 0) {
      const announcement = `Found ${resultCount} results`;
      const ariaLive = document.createElement("div");
      ariaLive.setAttribute("aria-live", "polite");
      ariaLive.setAttribute("aria-atomic", "true");
      ariaLive.className = "sr-only";
      ariaLive.textContent = announcement;
      document.body.appendChild(ariaLive);

      setTimeout(() => {
        document.body.removeChild(ariaLive);
      }, 1000);
    }
  }, [announceResults, resultCount]);

  return <>{children}</>;
}
