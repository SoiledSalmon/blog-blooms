import { useState } from 'react';
import { ContentBlock } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Type, 
  Image, 
  Video, 
  Music, 
  Quote, 
  Link 
} from 'lucide-react';

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function ContentBlockEditor({ blocks, onChange }: ContentBlockEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      metadata: {}
    };
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    onChange(newBlocks);
  };

  const deleteBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    onChange(newBlocks);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveBlock(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const getBlockIcon = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text': return <Type className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Music className="h-4 w-4" />;
      case 'quote': return <Quote className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      default: return <Type className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Block Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Add Content Block</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addBlock('text')}
              className="flex items-center space-x-1"
            >
              <Type className="h-4 w-4" />
              <span>Text</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addBlock('image')}
              className="flex items-center space-x-1"
            >
              <Image className="h-4 w-4" />
              <span>Image</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addBlock('video')}
              className="flex items-center space-x-1"
            >
              <Video className="h-4 w-4" />
              <span>Video</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addBlock('audio')}
              className="flex items-center space-x-1"
            >
              <Music className="h-4 w-4" />
              <span>Audio</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addBlock('quote')}
              className="flex items-center space-x-1"
            >
              <Quote className="h-4 w-4" />
              <span>Quote</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addBlock('link')}
              className="flex items-center space-x-1"
            >
              <Link className="h-4 w-4" />
              <span>Link</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Blocks */}
      {blocks.map((block, index) => (
        <Card 
          key={block.id}
          className="relative"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
              {getBlockIcon(block.type)}
              <Badge variant="outline">{block.type}</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteBlock(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Content Input */}
            {block.type === 'text' || block.type === 'quote' ? (
              <div>
                <Label>Content</Label>
                <Textarea
                  value={block.content}
                  onChange={(e) => updateBlock(index, { content: e.target.value })}
                  placeholder={`Enter ${block.type} content...`}
                  rows={block.type === 'quote' ? 2 : 4}
                />
              </div>
            ) : (
              <div>
                <Label>URL</Label>
                <Input
                  value={block.content}
                  onChange={(e) => updateBlock(index, { content: e.target.value })}
                  placeholder={`Enter ${block.type} URL...`}
                />
              </div>
            )}

            {/* Metadata Fields */}
            {(block.type === 'image' || block.type === 'video') && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Alt Text</Label>
                  <Input
                    value={block.metadata?.alt || ''}
                    onChange={(e) => updateBlock(index, { 
                      metadata: { ...block.metadata, alt: e.target.value }
                    })}
                    placeholder="Alt text for accessibility"
                  />
                </div>
                <div>
                  <Label>Caption</Label>
                  <Input
                    value={block.metadata?.caption || ''}
                    onChange={(e) => updateBlock(index, { 
                      metadata: { ...block.metadata, caption: e.target.value }
                    })}
                    placeholder="Caption text"
                  />
                </div>
              </div>
            )}

            {block.type === 'link' && (
              <div>
                <Label>Link Title</Label>
                <Input
                  value={block.metadata?.title || ''}
                  onChange={(e) => updateBlock(index, { 
                    metadata: { ...block.metadata, title: e.target.value }
                  })}
                  placeholder="Link title"
                />
              </div>
            )}

            {/* Preview */}
            {block.content && (
              <div className="border rounded-md p-3 bg-accent/50">
                <Label className="text-xs text-muted-foreground">Preview:</Label>
                {block.type === 'image' && (
                  <img 
                    src={block.content} 
                    alt={block.metadata?.alt || ''} 
                    className="w-full h-32 object-cover rounded mt-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                {block.type === 'video' && (
                  <video 
                    src={block.content} 
                    className="w-full h-32 object-cover rounded mt-2"
                    controls
                  />
                )}
                {block.type === 'audio' && (
                  <audio 
                    src={block.content} 
                    className="w-full mt-2"
                    controls
                  />
                )}
                {block.type === 'text' && (
                  <p className="mt-2 text-sm">{block.content.slice(0, 100)}...</p>
                )}
                {block.type === 'quote' && (
                  <blockquote className="mt-2 italic border-l-2 border-primary pl-3">
                    {block.content}
                  </blockquote>
                )}
                {block.type === 'link' && (
                  <a 
                    href={block.content} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 text-primary hover:underline block"
                  >
                    {block.metadata?.title || block.content}
                  </a>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {blocks.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No content blocks yet. Add your first block above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}