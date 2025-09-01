import { useState, useEffect } from 'react';
import { SavedPost } from '@/types/blog';
import { PostCard } from '@/components/blog/PostCard';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SavedPosts() {
  const navigate = useNavigate();
  const { getSavedPosts } = useBlog();
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);

  useEffect(() => {
    const posts = getSavedPosts();
    setSavedPosts(posts);
  }, [getSavedPosts]);

  if (savedPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Saved Posts</h1>
          </div>
        </div>

        <div className="text-center py-12">
          <Bookmark className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No saved posts yet</h2>
          <p className="text-muted-foreground mb-6">
            Start saving posts you want to read later by clicking the bookmark icon.
          </p>
          <Button onClick={() => navigate('/')}>
            Explore Posts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Saved Posts</h1>
          <span className="text-muted-foreground">({savedPosts.length})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedPosts.map((savedPost, index) => (
          <div key={savedPost.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <PostCard post={savedPost.post} />
          </div>
        ))}
      </div>
    </div>
  );
}