import { QueryClientWrapper } from "@/api/QueryClientWrapper";
import { ErrorBoundary, ThemeProvider } from "@/components";
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
            <QueryClientWrapper>{children}</QueryClientWrapper>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
