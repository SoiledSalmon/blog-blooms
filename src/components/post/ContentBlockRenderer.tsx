import { ContentBlock } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ContentBlockRendererProps {
  blocks: ContentBlock[];
}

export function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="blog-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {block.content}
            </ReactMarkdown>
          </div>
        );

      case 'image':
        return (
          <figure className="space-y-2">
            <img 
              src={block.content} 
              alt={block.metadata?.alt || ''} 
              className="w-full rounded-lg object-cover hover-scale"
            />
            {block.metadata?.caption && (
              <figcaption className="text-sm text-muted-foreground text-center">
                {block.metadata.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'video':
        return (
          <figure className="space-y-2">
            <video 
              src={block.content} 
              className="w-full rounded-lg"
              controls
              poster={block.metadata?.alt}
            />
            {block.metadata?.caption && (
              <figcaption className="text-sm text-muted-foreground text-center">
                {block.metadata.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'audio':
        return (
          <Card className="bg-accent/30">
            <CardContent className="p-4">
              <audio 
                src={block.content} 
                className="w-full"
                controls
              />
              {block.metadata?.caption && (
                <p className="text-sm text-muted-foreground mt-2">
                  {block.metadata.caption}
                </p>
              )}
            </CardContent>
          </Card>
        );

      case 'quote':
        return (
          <blockquote className="text-xl italic text-center py-6 border-l-4 border-primary pl-6 bg-accent/20 rounded-r-lg">
            "{block.content}"
          </blockquote>
        );

      case 'link':
        return (
          <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0"></div>
                <div>
                  <a 
                    href={block.content} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {block.metadata?.title || block.content}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {new URL(block.content).hostname}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <div key={block.id} className="animate-fade-in">
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
}