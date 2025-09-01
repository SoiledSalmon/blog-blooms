import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post, User, SavedPost, Comment, SearchFilters, PaginatedResponse } from '@/types/blog';
import { mockPosts, mockUser, mockComments } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface BlogContextType {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Posts state
  posts: Post[];
  loading: boolean;
  searchFilters: SearchFilters;
  
  // Actions
  getPosts: (filters?: SearchFilters, cursor?: string) => Promise<PaginatedResponse<Post>>;
  getPost: (id: string) => Promise<Post | null>;
  createPost: (postData: Partial<Post>) => Promise<Post>;
  updatePost: (id: string, postData: Partial<Post>) => Promise<Post>;
  deletePost: (id: string) => Promise<boolean>;
  
  // Interactions
  toggleLike: (postId: string) => Promise<boolean>;
  toggleSave: (postId: string) => Promise<boolean>;
  getSavedPosts: () => SavedPost[];
  
  // Comments
  getComments: (postId: string) => Promise<Comment[]>;
  addComment: (postId: string, content: string, parentId?: string) => Promise<Comment>;
  
  // Search
  searchPosts: (filters: SearchFilters) => Promise<Post[]>;
  setSearchFilters: (filters: SearchFilters) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const { toast } = useToast();

  // Initialize with mock data
  useEffect(() => {
    setUser(mockUser);
    setPosts(mockPosts);
  }, []);

  // Local storage helpers
  const getSavedPostIds = (): string[] => {
    try {
      const saved = localStorage.getItem('blog_saved_posts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const saveSavedPostIds = (ids: string[]) => {
    localStorage.setItem('blog_saved_posts', JSON.stringify(ids));
  };

  const getLikedPostIds = (): string[] => {
    try {
      const liked = localStorage.getItem('blog_liked_posts');
      return liked ? JSON.parse(liked) : [];
    } catch {
      return [];
    }
  };

  const saveLikedPostIds = (ids: string[]) => {
    localStorage.setItem('blog_liked_posts', JSON.stringify(ids));
  };

  // Update posts with saved/liked status
  useEffect(() => {
    const savedIds = getSavedPostIds();
    const likedIds = getLikedPostIds();
    
    setPosts(prevPosts => 
      prevPosts.map(post => ({
        ...post,
        isSaved: savedIds.includes(post.id),
        isLiked: likedIds.includes(post.id)
      }))
    );
  }, []);

  const getPosts = async (filters?: SearchFilters, cursor?: string): Promise<PaginatedResponse<Post>> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredPosts = [...posts];
    
    if (filters?.query) {
      const query = filters.query.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(query))
      );
    }
    
    if (filters?.type) {
      filteredPosts = filteredPosts.filter(post => post.type === filters.type);
    }
    
    if (filters?.tags?.length) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(tag => filters.tags!.includes(tag.id))
      );
    }
    
    if (filters?.categories?.length) {
      filteredPosts = filteredPosts.filter(post => 
        post.categories.some(cat => filters.categories!.includes(cat.id))
      );
    }
    
    // Sort by date
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const limit = 12;
    const page = 1; // Simplified pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    setLoading(false);
    
    return {
      data: paginatedPosts,
      total: filteredPosts.length,
      page,
      limit,
      hasMore: endIndex < filteredPosts.length
    };
  };

  const getPost = async (id: string): Promise<Post | null> => {
    const post = posts.find(p => p.id === id);
    if (post) {
      // Increment view count
      setPosts(prev => prev.map(p => 
        p.id === id ? { ...p, views: p.views + 1 } : p
      ));
    }
    return post || null;
  };

  const createPost = async (postData: Partial<Post>): Promise<Post> => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: postData.title || 'Untitled',
      slug: postData.title?.toLowerCase().replace(/\s+/g, '-') || 'untitled',
      content: postData.content || '',
      type: postData.type || 'TEXT',
      status: postData.status || 'DRAFT',
      license: postData.license || 'COPYRIGHT',
      author: user!,
      tags: postData.tags || [],
      categories: postData.categories || [],
      media: postData.media || [],
      readTime: Math.ceil((postData.content?.split(' ').length || 0) / 200),
      wordCount: postData.content?.split(' ').length || 0,
      views: 0,
      likes: 0,
      commentsCount: 0,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: postData.status === 'PUBLISHED' ? new Date() : undefined,
      ...postData
    };

    setPosts(prev => [newPost, ...prev]);
    
    toast({
      title: "Post created",
      description: `${newPost.title} has been ${newPost.status === 'PUBLISHED' ? 'published' : 'saved as draft'}.`
    });

    return newPost;
  };

  const updatePost = async (id: string, postData: Partial<Post>): Promise<Post> => {
    const updatedPost = posts.find(p => p.id === id);
    if (!updatedPost) throw new Error('Post not found');

    const updated = {
      ...updatedPost,
      ...postData,
      updatedAt: new Date(),
      publishedAt: postData.status === 'PUBLISHED' && !updatedPost.publishedAt ? new Date() : updatedPost.publishedAt
    };

    setPosts(prev => prev.map(p => p.id === id ? updated : p));
    
    toast({
      title: "Post updated",
      description: `${updated.title} has been updated.`
    });

    return updated;
  };

  const deletePost = async (id: string): Promise<boolean> => {
    setPosts(prev => prev.filter(p => p.id !== id));
    
    toast({
      title: "Post deleted",
      description: "The post has been permanently deleted."
    });

    return true;
  };

  const toggleLike = async (postId: string): Promise<boolean> => {
    const likedIds = getLikedPostIds();
    const isCurrentlyLiked = likedIds.includes(postId);
    
    let newLikedIds: string[];
    if (isCurrentlyLiked) {
      newLikedIds = likedIds.filter(id => id !== postId);
    } else {
      newLikedIds = [...likedIds, postId];
    }
    
    saveLikedPostIds(newLikedIds);
    
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !isCurrentlyLiked,
            likes: post.likes + (isCurrentlyLiked ? -1 : 1)
          }
        : post
    ));

    return !isCurrentlyLiked;
  };

  const toggleSave = async (postId: string): Promise<boolean> => {
    const savedIds = getSavedPostIds();
    const isCurrentlySaved = savedIds.includes(postId);
    
    let newSavedIds: string[];
    if (isCurrentlySaved) {
      newSavedIds = savedIds.filter(id => id !== postId);
      toast({
        title: "Post unsaved",
        description: "Removed from your saved posts."
      });
    } else {
      newSavedIds = [...savedIds, postId];
      toast({
        title: "Post saved",
        description: "Added to your saved posts."
      });
    }
    
    saveSavedPostIds(newSavedIds);
    
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !isCurrentlySaved }
        : post
    ));

    return !isCurrentlySaved;
  };

  const getSavedPosts = (): SavedPost[] => {
    const savedIds = getSavedPostIds();
    return savedIds.map(id => {
      const post = posts.find(p => p.id === id);
      return {
        id: `saved_${id}`,
        userId: user?.id || '',
        postId: id,
        post: post!,
        createdAt: new Date()
      };
    }).filter(saved => saved.post);
  };

  const getComments = async (postId: string): Promise<Comment[]> => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const addComment = async (postId: string, content: string, parentId?: string): Promise<Comment> => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        id: user?.id || 'anonymous',
        name: user?.name || 'Anonymous',
        avatar: user?.avatar
      },
      postId,
      parentId,
      isApproved: true,
      createdAt: new Date()
    };

    // Update comments count
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, commentsCount: post.commentsCount + 1 }
        : post
    ));

    toast({
      title: "Comment added",
      description: "Your comment has been posted."
    });

    return newComment;
  };

  const searchPosts = async (filters: SearchFilters): Promise<Post[]> => {
    const result = await getPosts(filters);
    return result.data;
  };

  const value: BlogContextType = {
    user,
    setUser,
    posts,
    loading,
    searchFilters,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    toggleSave,
    getSavedPosts,
    getComments,
    addComment,
    searchPosts,
    setSearchFilters
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};