"use client";

import { Button } from "@/components/ui/button";
import type { SearchType } from "@/types";
import { GitBranch, Users } from "lucide-react";

interface SearchTypeSelectorProps {
  value: SearchType;
  onChange: (type: SearchType) => void;
}

export function SearchTypeSelector({
  value,
  onChange,
}: SearchTypeSelectorProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={value === "repositories" ? "default" : "outline"}
        onClick={() => onChange("repositories")}
        className="flex items-center gap-2"
      >
        <GitBranch className="w-4 h-4" />
        Repositories
      </Button>
      <Button
        variant={value === "users" ? "default" : "outline"}
        onClick={() => onChange("users")}
        className="flex items-center gap-2"
      >
        <Users className="w-4 h-4" />
        Users
      </Button>
    </div>
  );
}
