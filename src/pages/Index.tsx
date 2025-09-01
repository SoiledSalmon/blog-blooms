import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostsGrid } from '@/components/blog/PostsGrid';
import { SearchFilters } from '@/types/blog';
import { useBlog } from '@/contexts/BlogContext';

const Index = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({});
  const { setSearchFilters } = useBlog();

  useEffect(() => {
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    const newFilters: SearchFilters = {};
    
    if (search) newFilters.query = search;
    if (tag) newFilters.tags = [tag];
    if (category) newFilters.categories = [category];
    if (type) newFilters.type = type as any;

    setFilters(newFilters);
    setSearchFilters(newFilters);
  }, [searchParams, setSearchFilters]);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover insights, tutorials, and stories about technology, design, and life. 
            Join our community of writers and readers sharing knowledge.
          </p>
        </section>

        {/* Posts Grid */}
        <section>
          <PostsGrid filters={filters} showFeatured={!Object.keys(filters).length} />
        </section>
      </main>
    </div>
  );
};

export default Index;
