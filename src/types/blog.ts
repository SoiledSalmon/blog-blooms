// Blog application types

export type UserRole = 'ADMIN' | 'AUTHOR' | 'READER';

export type PostType = 'TEXT' | 'PHOTO' | 'QUOTE' | 'LINK' | 'VIDEO' | 'AUDIO';

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type License = 'COPYRIGHT' | 'CC_BY' | 'CC_BY_SA' | 'CC0';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  createdAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  postCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  filename: string;
  size: number;
  alt?: string;
  caption?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  type: PostType;
  status: PostStatus;
  license: License;
  author: User;
  tags: Tag[];
  categories: Category[];
  media: MediaFile[];
  featuredImage?: string;
  readTime: number; // minutes
  wordCount: number;
  views: number;
  likes: number;
  commentsCount: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  postId: string;
  parentId?: string;
  isApproved: boolean;
  createdAt: Date;
  replies?: Comment[];
}

export interface SavedPost {
  id: string;
  userId: string;
  postId: string;
  post: Post;
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  tags?: string[];
  categories?: string[];
  type?: PostType;
  author?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  postsThisMonth: number;
  viewsThisMonth: number;
}