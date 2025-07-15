import { QueryClientWrapper } from "@/api/QueryClientWrapper";
import { ErrorBoundary, ThemeProvider } from "@/components";
import { AuthProvider } from "@/lib/auth";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Almosafer Challenge",
  description: "Created by Mousa Ibrahim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <QueryClientWrapper>{children}</QueryClientWrapper>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
