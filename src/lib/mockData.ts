import { Post, User, Comment, Tag, Category } from '@/types/blog';

export const mockUser: User = {
  id: 'user_1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'AUTHOR',
  bio: 'Passionate writer and tech enthusiast. Love sharing insights about technology, design, and life.',
  createdAt: new Date('2023-01-15')
};

export const mockTags: Tag[] = [
  { id: 'tag_1', name: 'Technology', slug: 'technology', color: '#3B82F6', postCount: 15 },
  { id: 'tag_2', name: 'Design', slug: 'design', color: '#8B5CF6', postCount: 12 },
  { id: 'tag_3', name: 'Programming', slug: 'programming', color: '#10B981', postCount: 18 },
  { id: 'tag_4', name: 'Life', slug: 'life', color: '#F59E0B', postCount: 8 },
  { id: 'tag_5', name: 'Travel', slug: 'travel', color: '#EF4444', postCount: 6 },
  { id: 'tag_6', name: 'Photography', slug: 'photography', color: '#EC4899', postCount: 10 }
];

export const mockCategories: Category[] = [
  { id: 'cat_1', name: 'Tech Insights', slug: 'tech-insights', description: 'Latest trends and insights in technology', postCount: 20 },
  { id: 'cat_2', name: 'Creative Process', slug: 'creative-process', description: 'Behind the scenes of creative work', postCount: 15 },
  { id: 'cat_3', name: 'Personal Thoughts', slug: 'personal-thoughts', description: 'Personal reflections and experiences', postCount: 12 },
  { id: 'cat_4', name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step guides and tutorials', postCount: 18 }
];

export const mockPosts: Post[] = [
  {
    id: 'post_1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-web-development-2024',
    content: `# The Future of Web Development: Trends to Watch in 2024

Web development continues to evolve at a rapid pace, and 2024 promises to bring exciting new trends and technologies that will shape how we build and interact with web applications.

## 1. Server Components and Edge Computing

The rise of **server components** in frameworks like Next.js and the growing adoption of **edge computing** are revolutionizing how we think about web performance and user experience.

\`\`\`javascript
// Example of a server component
async function BlogPost({ id }) {
  const post = await fetchPost(id); // This runs on the server
  return <article>{post.content}</article>;
}
\`\`\`

## 2. AI-Powered Development Tools

Artificial intelligence is becoming an integral part of the development process, from code generation to automated testing and deployment.

> "AI won't replace developers, but developers who use AI will replace developers who don't." - Anonymous

## 3. WebAssembly (WASM) Adoption

WebAssembly is enabling high-performance applications in the browser, bringing languages like Rust, C++, and Go to web development.

### Key Benefits:
- Near-native performance
- Language diversity
- Enhanced security

The landscape of web development is more exciting than ever, with these trends pointing toward a future of faster, more capable, and more accessible web applications.`,
    excerpt: 'Exploring the key trends that will shape web development in 2024, from server components to AI-powered tools.',
    type: 'TEXT',
    status: 'PUBLISHED',
    license: 'CC_BY',
    author: mockUser,
    tags: [mockTags[0], mockTags[2]],
    categories: [mockCategories[0]],
    media: [],
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    readTime: 5,
    wordCount: 420,
    views: 1245,
    likes: 89,
    commentsCount: 12,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    publishedAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'post_2',
    title: 'Minimalist Design: Less is More',
    slug: 'minimalist-design-philosophy',
    content: `# Minimalist Design: Less is More

In a world cluttered with information and visual noise, minimalist design stands as a beacon of clarity and purpose. This design philosophy, rooted in the principle that "less is more," has become increasingly relevant in our digital age.

## The Essence of Minimalism

Minimalist design isn't about removing everything until nothing remains. Instead, it's about **intentional reduction** – keeping only what serves a purpose and enhances the user experience.

### Core Principles:

1. **Simplicity** - Eliminate unnecessary elements
2. **Functionality** - Every element serves a purpose
3. **Clarity** - Clear hierarchy and navigation
4. **White Space** - Embrace emptiness as a design element

## Benefits in Digital Design

- **Improved Focus** - Users can concentrate on what matters
- **Faster Load Times** - Fewer elements mean better performance
- **Enhanced Usability** - Simpler interfaces are easier to navigate
- **Timeless Appeal** - Minimal designs age gracefully

## Implementing Minimalism

Start by asking: "Does this element add value?" If the answer isn't a clear yes, consider removing it.

Remember, minimalism isn't about being bare or cold – it's about being intentional and creating space for what truly matters.`,
    excerpt: 'Exploring how minimalist design principles can create more focused and effective digital experiences.',
    type: 'TEXT',
    status: 'PUBLISHED',
    license: 'CC_BY_SA',
    author: mockUser,
    tags: [mockTags[1]],
    categories: [mockCategories[1]],
    media: [],
    featuredImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
    readTime: 3,
    wordCount: 280,
    views: 892,
    likes: 156,
    commentsCount: 8,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-12T14:20:00'),
    updatedAt: new Date('2024-01-12T14:20:00'),
    publishedAt: new Date('2024-01-12T14:20:00')
  },
  {
    id: 'post_3',
    title: 'Building Accessible Web Applications',
    slug: 'building-accessible-web-applications',
    content: `# Building Accessible Web Applications

Web accessibility isn't just a nice-to-have feature – it's a fundamental requirement for creating inclusive digital experiences that work for everyone.

## Why Accessibility Matters

- **Legal Compliance** - Many countries have accessibility laws
- **Market Reach** - 15% of the global population has some form of disability
- **Better UX** - Accessible design benefits all users
- **SEO Benefits** - Screen readers and search engines have similar needs

## Key Accessibility Principles (WCAG)

### 1. Perceivable
Information must be presentable in ways users can perceive:
- Provide text alternatives for images
- Offer captions for videos
- Ensure sufficient color contrast

### 2. Operable
Interface components must be operable:
- Make all functionality keyboard accessible
- Give users enough time to read content
- Don't use content that causes seizures

### 3. Understandable
Information and UI operation must be understandable:
- Make text readable and understandable
- Make content appear and operate in predictable ways
- Help users avoid and correct mistakes

### 4. Robust
Content must be robust enough for interpretation by assistive technologies.

## Practical Implementation Tips

\`\`\`html
<!-- Good: Semantic HTML with proper labels -->
<button aria-label="Close dialog">×</button>

<!-- Better: Descriptive text -->
<button>Close dialog</button>

<!-- Image with alt text -->
<img src="chart.png" alt="Sales increased 25% from Q1 to Q2">
\`\`\`

## Testing Your Application

1. **Keyboard Navigation** - Can you navigate without a mouse?
2. **Screen Reader Testing** - Use NVDA, JAWS, or VoiceOver
3. **Color Contrast** - Use tools like WebAIM's contrast checker
4. **Automated Testing** - Tools like axe-core can catch many issues

Remember: Accessibility is not a feature to add at the end – it should be considered from the very beginning of your design and development process.`,
    excerpt: 'A comprehensive guide to building web applications that are accessible to users with disabilities.',
    type: 'TEXT',
    status: 'PUBLISHED',
    license: 'CC_BY',
    author: mockUser,
    tags: [mockTags[0], mockTags[2]],
    categories: [mockCategories[3]],
    media: [],
    featuredImage: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=400&fit=crop',
    readTime: 7,
    wordCount: 650,
    views: 2103,
    likes: 234,
    commentsCount: 18,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-10T09:15:00'),
    updatedAt: new Date('2024-01-10T09:15:00'),
    publishedAt: new Date('2024-01-10T09:15:00')
  },
  {
    id: 'post_4',
    title: 'Coffee and Code: A Perfect Pair',
    slug: 'coffee-and-code',
    content: `# Coffee and Code: A Perfect Pair

There's something magical about the relationship between coffee and coding. For many developers, the day doesn't truly begin until that first cup of coffee meets the first line of code.

## The Ritual

Every developer has their coffee ritual:
- The morning brew that kickstarts creativity
- The afternoon espresso that fights the post-lunch slump
- The late-night coffee that fuels those breakthrough moments

## Science Behind the Boost

Caffeine doesn't just wake you up – it enhances:
- **Focus and Concentration** - Blocks adenosine, reducing drowsiness
- **Memory Formation** - Helps with both short-term and long-term memory
- **Problem-Solving** - Increases dopamine, enhancing mood and cognitive function

## My Personal Coffee Journey

I started as a simple black coffee drinker, but over the years, I've discovered the joy of:
- **Pour-over methods** - The meditation of manual brewing
- **Cold brew** - Perfect for long coding sessions
- **Specialty roasts** - Each origin brings different flavor notes

## The Perfect Coding Coffee

What makes the ideal programming companion?
- **Medium roast** - Balanced flavor without overwhelming acidity
- **Consistent temperature** - Keep it warm throughout your session
- **Proper caffeine timing** - Peak effectiveness 30-60 minutes after consumption

## Coffee Shop Coding

Sometimes, a change of environment sparks creativity. The ambient noise of a coffee shop can actually improve focus for some people – it's called the "coffee shop effect."

Whether you're debugging at 2 AM or architecting a new system at dawn, coffee remains the faithful companion to countless developers worldwide.

*What's your coffee and coding ritual? Share in the comments below!*`,
    excerpt: 'Exploring the beloved relationship between coffee and coding, and how caffeine fuels creativity.',
    type: 'TEXT',
    status: 'PUBLISHED',
    license: 'COPYRIGHT',
    author: mockUser,
    tags: [mockTags[3], mockTags[2]],
    categories: [mockCategories[2]],
    media: [],
    featuredImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',
    readTime: 4,
    wordCount: 380,
    views: 567,
    likes: 78,
    commentsCount: 15,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-08T16:45:00'),
    updatedAt: new Date('2024-01-08T16:45:00'),
    publishedAt: new Date('2024-01-08T16:45:00')
  },
  {
    id: 'post_5',
    title: '"Code is poetry written in logic"',
    slug: 'code-is-poetry',
    content: `Code is poetry written in logic. Every function tells a story, every variable holds meaning, and every algorithm dances with data to create something beautiful and functional.

The elegance of well-written code lies not just in what it does, but in how clearly it expresses the developer's intent. Like poetry, great code has rhythm, structure, and meaning that resonates beyond its immediate purpose.`,
    excerpt: 'A reflection on the artistic nature of programming and the beauty found in well-crafted code.',
    type: 'QUOTE',
    status: 'PUBLISHED',
    license: 'CC0',
    author: mockUser,
    tags: [mockTags[2], mockTags[3]],
    categories: [mockCategories[2]],
    media: [],
    readTime: 1,
    wordCount: 85,
    views: 1834,
    likes: 267,
    commentsCount: 23,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-06T11:30:00'),
    updatedAt: new Date('2024-01-06T11:30:00'),
    publishedAt: new Date('2024-01-06T11:30:00')
  },
  {
    id: 'post_6',
    title: 'Amazing React Developer Tools You Should Know',
    slug: 'react-developer-tools',
    content: `# Amazing React Developer Tools You Should Know

React development has come a long way, and with it, an ecosystem of incredible tools that make our lives easier. Here are some must-have tools every React developer should know about.

## Development Environment

### 1. Vite
Lightning-fast build tool that's revolutionizing React development:
- **Instant Hot Module Replacement**
- **Optimized build process**
- **Plugin ecosystem**

### 2. React Developer Tools
Essential browser extension for debugging React applications:
- Component tree inspection
- Props and state debugging  
- Performance profiling

## State Management

### Zustand
Simple, fast, and scalable state management:

\`\`\`javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
\`\`\`

### React Query (TanStack Query)
Powerful data fetching and caching:
- Automatic background refetching
- Optimistic updates
- Error handling

## UI Development

### Storybook
Build components in isolation:
- Component documentation
- Visual testing
- Design system development

### Framer Motion
Beautiful animations made simple:

\`\`\`jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Hello World
</motion.div>
\`\`\`

## Testing

### React Testing Library
Test your components the way users interact with them:
- Focus on user behavior
- Maintainable tests
- Accessibility testing

### Playwright
End-to-end testing that actually works:
- Cross-browser testing
- Visual comparisons
- Network interception

These tools can significantly improve your development experience and help you build better React applications. Start with one or two and gradually add more to your toolkit as needed.`,
    excerpt: 'A curated list of essential React developer tools that will supercharge your development workflow.',
    type: 'TEXT',
    status: 'PUBLISHED',
    license: 'CC_BY',
    author: mockUser,
    tags: [mockTags[0], mockTags[2]],
    categories: [mockCategories[0], mockCategories[3]],
    media: [],
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    readTime: 6,
    wordCount: 520,
    views: 3421,
    likes: 445,
    commentsCount: 31,
    isLiked: false,
    isSaved: false,
    createdAt: new Date('2024-01-04T13:20:00'),
    updatedAt: new Date('2024-01-04T13:20:00'),
    publishedAt: new Date('2024-01-04T13:20:00')
  }
];

export const mockComments: Comment[] = [
  {
    id: 'comment_1',
    content: 'Great insights! I especially agree with your points about server components. The future of web development is indeed exciting.',
    author: {
      id: 'user_2',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b784?w=150&h=150&fit=crop&crop=face'
    },
    postId: 'post_1',
    isApproved: true,
    createdAt: new Date('2024-01-15T12:30:00')
  },
  {
    id: 'comment_2',
    content: 'WebAssembly is definitely a game-changer. Have you tried using it with Rust? The performance gains are incredible.',
    author: {
      id: 'user_3',
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    postId: 'post_1',
    isApproved: true,
    createdAt: new Date('2024-01-15T14:15:00')
  },
  {
    id: 'comment_3',
    content: 'This perfectly captures why I love minimalist design. Sometimes the hardest part is knowing what to remove!',
    author: {
      id: 'user_4',
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    postId: 'post_2',
    isApproved: true,
    createdAt: new Date('2024-01-12T16:45:00')
  },
  {
    id: 'comment_4',
    content: 'Accessibility should definitely be a priority from day one. Thanks for sharing these practical tips!',
    author: {
      id: 'user_5',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    postId: 'post_3',
    isApproved: true,
    createdAt: new Date('2024-01-10T11:20:00')
  }
];