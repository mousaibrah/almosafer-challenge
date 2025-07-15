import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2
        data-testid="loading-spinner"
        className="w-8 h-8 animate-spin text-gray-500"
      />
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
}
