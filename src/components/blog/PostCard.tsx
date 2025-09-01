import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Eye, Bookmark, Clock, User } from 'lucide-react';
import { Post } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useBlog } from '@/contexts/BlogContext';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact' | 'featured';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const { toggleLike, toggleSave } = useBlog();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(post.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(post.id);
  };

  const getPostIcon = () => {
    switch (post.type) {
      case 'QUOTE':
        return '"';
      case 'PHOTO':
        return '📸';
      case 'VIDEO':
        return '🎥';
      case 'AUDIO':
        return '🎵';
      case 'LINK':
        return '🔗';
      default:
        return '📝';
    }
  };

  const renderContent = () => {
    if (post.type === 'QUOTE') {
      return (
        <blockquote className="text-lg italic text-foreground/80 border-l-4 border-primary pl-4">
          {post.content}
        </blockquote>
      );
    }

    return (
      <p className="text-foreground/70 line-clamp-3">
        {post.excerpt || post.content.substring(0, 150) + '...'}
      </p>
    );
  };

  if (variant === 'featured') {
    return (
      <Link to={`/post/${post.id}`} className="block">
        <Card className="blog-card h-full group overflow-hidden">
          {post.featuredImage && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover image-hover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                  {getPostIcon()} {post.type}
                </Badge>
              </div>
            </div>
          )}
          
          <CardHeader className="space-y-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>
          </CardHeader>

          <CardContent className="space-y-4">
            {renderContent()}
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag.id} variant="outline" className="text-xs">
                    #{tag.name}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}m read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{post.views}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={post.isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="ml-1">{post.likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4" />
                <span className="ml-1">{post.commentsCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={post.isSaved ? 'text-primary' : ''}
              >
                <Bookmark className={`h-4 w-4 ${post.isSaved ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/post/${post.id}`} className="block">
      <Card className="blog-card h-full group">
        {post.featuredImage && variant === 'default' && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover image-hover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                {getPostIcon()} {post.type}
              </Badge>
            </div>
          </div>
        )}
        
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{post.author.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-3">
          {renderContent()}
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  #{tag.name}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}m</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{post.views}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`h-8 px-2 ${post.isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-3 w-3 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="ml-1 text-xs">{post.likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={`h-8 px-2 ${post.isSaved ? 'text-primary' : ''}`}
            >
              <Bookmark className={`h-3 w-3 ${post.isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}