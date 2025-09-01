import { useState, useEffect } from 'react';
import { Post, SearchFilters } from '@/types/blog';
import { PostCard } from './PostCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlog } from '@/contexts/BlogContext';

interface PostsGridProps {
  filters?: SearchFilters;
  showFeatured?: boolean;
}

export function PostsGrid({ filters, showFeatured = false }: PostsGridProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { getPosts } = useBlog();

  useEffect(() => {
    loadPosts(true);
  }, [filters]);

  const loadPosts = async (reset: boolean = false) => {
    if (loading && !reset) return;
    
    setLoading(true);
    
    try {
      const result = await getPosts(filters);
      
      if (reset) {
        setPosts(result.data);
        setPage(1);
      } else {
        setPosts(prev => [...prev, ...result.data]);
      }
      
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      loadPosts(false);
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground">No posts found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    );
  }

  const featuredPost = showFeatured ? posts[0] : null;
  const regularPosts = showFeatured ? posts.slice(1) : posts;

  return (
    <div className="space-y-8">
      {/* Featured Post */}
      {featuredPost && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured</h2>
          <PostCard post={featuredPost} variant="featured" />
        </div>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <div>
          {showFeatured && <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <div key={post.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            size="lg"
          >
            {loading ? 'Loading...' : 'Load More Posts'}
          </Button>
        </div>
      )}

      {/* Loading More Posts */}
      {loading && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <PostCardSkeleton key={`loading-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex space-x-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}