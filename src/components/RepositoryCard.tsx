"use client";

import { useFetchData } from "@/api/useApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getFileExtensions } from "@/lib/file-tags";
import { getLanguageVariant } from "@/lib/helper";
import type { GitHubForks, GitHubRepository } from "@/types";
import { ExternalLink, Eye, GitFork, Star } from "lucide-react";
import { useState } from "react";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const [languages, setLanguages] = useState<string[]>([]);
  const [forks, setForks] = useState<GitHubForks[]>([]);

  useFetchData<Record<string, number>>({
    endpoint: repository.languages_url,
    options: {
      onSuccess(data) {
        setLanguages(Object.keys(data));
      },
    },
  });

  useFetchData<GitHubForks[]>({
    endpoint: repository.forks_url,
    config: {
      params: {
        per_page: 3,
        sort: "newest",
      },
    },
    options: {
      onSuccess(data) {
        console.log("data :>> ", data);
        setForks(data);
      },
    },
  });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage
                  src={repository?.owner?.avatar_url || "/placeholder.svg"}
                  alt={repository?.owner?.login}
                />
                <AvatarFallback>
                  {repository?.owner?.login?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-sm md:text-xl max-w-[9rem] md:max-w-none truncate font-semibold text-gray-900 ">
                {repository?.name}
              </h3>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <a
              href={repository?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden md:block"> View</span>
            </a>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 transition-all duration-300">
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {repository?.stargazers_count?.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              {repository?.forks_count?.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {repository?.watchers_count?.toLocaleString()}
            </div>
          </div>

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                File Types:
              </h4>
              <div className="flex flex-wrap gap-1">
                {languages.map((language) => {
                  const fileExtensions = getFileExtensions(language);
                  return (
                    <Badge
                      key={language}
                      variant={getLanguageVariant(language)}
                      className="text-xs cursor-pointer "
                      title={`${language} files (${fileExtensions.join(", ")})`}
                    >
                      {language}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Forks */}
          {forks?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Recent Forks:
              </h4>
              <div className="flex flex-wrap gap-2">
                {forks?.map((fork) => (
                  <a
                    key={fork.id}
                    href={`${fork?.owner?.html_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={fork?.owner?.avatar_url || "/placeholder.svg"}
                        alt={fork?.owner?.login}
                      />
                      <AvatarFallback className="text-xs">
                        {fork?.owner?.login?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">
                      {fork?.owner?.login}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
