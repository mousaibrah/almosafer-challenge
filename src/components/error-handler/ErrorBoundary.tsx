"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorFallback: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Alert className="max-w-lg w-full">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2">
          {error?.message || "An unexpected error occurred"}
          <Button onClick={resetErrorBoundary} className="mt-4 w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Page
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error("Error caught by boundary:", error, errorInfo);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};
