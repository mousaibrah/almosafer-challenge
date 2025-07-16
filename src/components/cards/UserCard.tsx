import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubUser } from "@/types/github";
import { ExternalLink } from "lucide-react";

interface UserCardProps {
  user: GitHubUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card data-testid="user-card" className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="size-8 sm:size-10 md:size-12 lg:size-16">
            <AvatarImage
              src={user?.avatar_url || "/placeholder.svg"}
              alt={user?.login}
            />
            <AvatarFallback>
              {user?.login?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-text">
              {user?.login}
            </h3>
            <p className="text-black">@{user?.login}</p>
          </div>

          <Button asChild variant="outline">
            <a
              href={user?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden md:block">View Profile</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
