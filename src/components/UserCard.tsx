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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={user.avatar_url || "/placeholder.svg"}
              alt={user.login}
            />
            <AvatarFallback>
              {user.login.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {user.name || user.login}
            </h3>
            <p className="text-gray-600">@{user.login}</p>
            {user.bio && (
              <p className="text-sm text-gray-700 mt-2">{user.bio}</p>
            )}
          </div>

          <Button asChild variant="outline">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Profile
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
