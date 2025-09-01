import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Post, Comment } from '@/types/blog';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Eye, 
  Clock, 
  Share2,
  Calendar
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, toggleLike, toggleSave, getComments, addComment } = useBlog();
  const { toast } = useToast();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadPost(id);
      loadComments(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      const postData = await getPost(postId);
      setPost(postData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load post.",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    try {
      const commentsData = await getComments(postId);
      setComments(commentsData);
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };

  const handleLike = () => {
    if (post) {
      toggleLike(post.id);
      setPost(prev => prev ? {
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.likes + (prev.isLiked ? -1 : 1)
      } : null);
    }
  };

  const handleSave = () => {
    if (post) {
      toggleSave(post.id);
      setPost(prev => prev ? {
        ...prev,
        isSaved: !prev.isSaved
      } : null);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !post) return;

    try {
      const comment = await addComment(post.id, newComment.trim());
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      setPost(prev => prev ? {
        ...prev,
        commentsCount: prev.commentsCount + 1
      } : null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment.",
        variant: "destructive"
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Post link copied to clipboard."
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-accent rounded w-1/4"></div>
            <div className="h-12 bg-accent rounded w-3/4"></div>
            <div className="h-64 bg-accent rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-accent rounded"></div>
              <div className="h-4 bg-accent rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="space-y-6">
            <div className="space-y-4">
              <Badge variant="outline">
                {post.type === 'QUOTE' ? '"' : post.type === 'PHOTO' ? '📸' : post.type === 'VIDEO' ? '🎥' : post.type === 'AUDIO' ? '🎵' : post.type === 'LINK' ? '🔗' : '📝'} {post.type}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Author and Meta */}
            <div className="flex items-center justify-between border-y py-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}m read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={post.isLiked ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="ml-2">{post.likes}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className={post.isSaved ? 'text-primary' : ''}
                >
                  <Bookmark className={`h-4 w-4 ${post.isSaved ? 'fill-current' : ''}`} />
                </Button>
                
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="blog-content">
            {post.type === 'QUOTE' ? (
              <blockquote className="text-2xl italic text-center py-8 border-l-4 border-primary pl-8">
                {post.content}
              </blockquote>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Comments Section */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <h2 className="text-2xl font-bold">
              Comments ({post.commentsCount})
            </h2>
          </div>

          {/* Add Comment */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Add a comment</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{comment.author.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-foreground/90">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}