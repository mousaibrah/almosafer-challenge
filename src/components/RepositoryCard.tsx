"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getRepositoryForks, getRepositoryLanguages } from "@/lib/helper";
import type { GitHubRepository, GitHubUser } from "@/types/github";
import { ExternalLink, Eye, GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const [languages, setLanguages] = useState<string[]>([]);
  const [forks, setForks] = useState<GitHubUser[]>([]);
  const [loadingExtras, setLoadingExtras] = useState(false);

  useEffect(() => {
    const loadExtraData = async () => {
      setLoadingExtras(true);
      try {
        const [languagesData, forksData] = await Promise.all([
          getRepositoryLanguages(repository.full_name),
          getRepositoryForks(repository.full_name),
        ]);
        setLanguages(Object.keys(languagesData));
        setForks(forksData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load extra repository data:", error);
      } finally {
        setLoadingExtras(false);
      }
    };

    loadExtraData();
  }, [repository.full_name]);

  const getFileExtensions = (language: string): string[] => {
    switch (language.toLowerCase()) {
      case "javascript":
        return [".js", ".jsx"];
      case "typescript":
        return [".ts", ".tsx"];
      case "python":
        return [".py"];
      case "java":
        return [".java"];
      case "c++":
        return [".cpp", ".cxx", ".hpp"];
      case "c#":
        return [".cs"];
      case "go":
        return [".go"];
      case "html":
        return [".html", ".htm"];
      case "css":
        return [".css"];
      case "shell":
        return [".sh", ".bash", ".zsh"];
      default:
        return [];
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {repository.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              by {repository.owner.login}
            </p>
            {repository.description && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {repository.description}
              </p>
            )}
          </div>
          <Button asChild variant="outline" size="sm">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View
            </a>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {repository.stargazers_count.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              {repository.forks_count.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {repository.watchers_count.toLocaleString()}
            </div>
            {repository.language && (
              <Badge variant="secondary">{repository.language}</Badge>
            )}
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
                      variant="outline"
                      className="text-xs"
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
          {forks.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Recent Forks:
              </h4>
              <div className="flex gap-2">
                {forks.map((fork) => (
                  <a
                    key={fork.id}
                    href={`https://github.com/${fork.login}/${repository.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={fork.avatar_url || "/placeholder.svg"}
                        alt={fork.login}
                      />
                      <AvatarFallback className="text-xs">
                        {fork.login.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">{fork.login}</span>
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
