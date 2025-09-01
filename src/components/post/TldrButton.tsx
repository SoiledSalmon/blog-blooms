import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Loader2 } from 'lucide-react';
import { Post } from '@/types/blog';

interface TldrButtonProps {
  post: Post;
}

export function TldrButton({ post }: TldrButtonProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(post.summary || '');

  const generateSummary = async () => {
    if (summary) return; // Already have summary
    
    setLoading(true);
    
    // Simulate API call to generate summary
    // In real app, this would call your summary API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate summary from alt texts and content
    const altTexts = post.media.map(m => m.alt).filter(Boolean);
    const contentWords = post.content.split(' ').slice(0, 50).join(' ');
    
    let generatedSummary = '';
    
    if (altTexts.length > 0) {
      generatedSummary = `This post features ${altTexts.join(', ')}. ${contentWords}...`;
    } else {
      generatedSummary = `${contentWords}...`;
    }
    
    // Limit to 3-4 sentences
    const sentences = generatedSummary.split('.').slice(0, 4).join('.') + '.';
    setSummary(sentences);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          onClick={generateSummary}
          className="bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border-primary/20"
        >
          <Zap className="h-4 w-4 mr-2" />
          TL;DR
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Quick Summary</span>
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span className="text-muted-foreground">Generating summary...</span>
              </div>
            ) : summary ? (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed">{summary}</p>
                <div className="text-xs text-muted-foreground border-t pt-3">
                  📖 Read time: {post.readTime}m • 👁️ {post.views} views
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Click TL;DR to generate a quick summary of this post.</p>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}