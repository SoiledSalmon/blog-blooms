import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostType, PostStatus, License } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBlog } from '@/contexts/BlogContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, Send, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CreatePost() {
  const navigate = useNavigate();
  const { createPost } = useBlog();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'TEXT' as PostType,
    status: 'DRAFT' as PostStatus,
    license: 'COPYRIGHT' as License,
    tags: [] as string[],
    categories: [] as string[],
    featuredImage: ''
  });

  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('write');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (status: PostStatus) => {
    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your post.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Content required", 
        description: "Please add some content to your post.",
        variant: "destructive"
      });
      return;
    }

    try {
      const post = await createPost({
        ...formData,
        status,
        tags: formData.tags.map(name => ({
          id: `tag_${name}`,
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          postCount: 1
        })),
        categories: formData.categories.map(name => ({
          id: `cat_${name}`,
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          postCount: 1
        }))
      });

      navigate(`/post/${post.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Create New Post</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleSubmit('DRAFT')}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit('PUBLISHED')}>
            <Send className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your post title..."
                  className="text-lg"
                />
              </div>

              {/* Content with Tabs */}
              <div>
                <Label>Content</Label>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="write" className="mt-4">
                    <Textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Write your post content... (Markdown supported)"
                      className="min-h-[400px] font-mono"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Markdown is supported. Use **bold**, *italic*, `code`, and more.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="preview" className="mt-4">
                    <div className="min-h-[400px] p-4 border rounded-md bg-card">
                      {formData.content ? (
                        <div className="blog-content">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {formData.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Preview will appear here...</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Post Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="type">Post Type</Label>
                <Select value={formData.type} onValueChange={(value: PostType) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEXT">📝 Text</SelectItem>
                    <SelectItem value="PHOTO">📸 Photo</SelectItem>
                    <SelectItem value="QUOTE">" Quote</SelectItem>
                    <SelectItem value="LINK">🔗 Link</SelectItem>
                    <SelectItem value="VIDEO">🎥 Video</SelectItem>
                    <SelectItem value="AUDIO">🎵 Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="license">License</Label>
                <Select value={formData.license} onValueChange={(value: License) => handleInputChange('license', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COPYRIGHT">© Copyright</SelectItem>
                    <SelectItem value="CC_BY">CC BY</SelectItem>
                    <SelectItem value="CC_BY_SA">CC BY-SA</SelectItem>
                    <SelectItem value="CC0">CC0 Public Domain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} variant="outline">Add</Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      #{tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          {formData.featuredImage && (
            <Card>
              <CardHeader>
                <CardTitle>Featured Image Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={formData.featuredImage}
                  alt="Featured"
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}