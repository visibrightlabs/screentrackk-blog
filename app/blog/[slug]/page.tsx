import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "../../lib/blog-data";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const canonicalUrl = `https://screentrackk.com/blog/${slug}`;

  return {
    title: `${post.seoTitle || post.title} | ScreenTrackk Blog`,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: "https://screentrackk.com/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ["https://screentrackk.com/og-image.png"],
    },
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Split content by paragraphs and format
    return content.split('\n\n').map((paragraph, index) => {
      // Handle headers
      if (paragraph.startsWith('##')) {
        const headerText = paragraph.replace(/^##\s+/, '');
        return (
          <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
            {headerText}
          </h2>
        );
      }
      
      if (paragraph.startsWith('###')) {
        const headerText = paragraph.replace(/^###\s+/, '');
        return (
          <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
            {headerText}
          </h3>
        );
      }

      if (paragraph.startsWith('####')) {
        const headerText = paragraph.replace(/^####\s+/, '');
        return (
          <h4 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">
            {headerText}
          </h4>
        );
      }

      // Handle bullet lists
      if (paragraph.includes('- ')) {
        const items = paragraph.split('\n').filter(line => line.trim().startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-gray-700 dark:text-gray-300">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="ml-4">
                {item.replace(/^- /, '')}
              </li>
            ))}
          </ul>
        );
      }

      // Handle bold text sections
      if (paragraph.includes('**')) {
        const parts = paragraph.split('**');
        return (
          <div key={index} className="mb-6">
            {parts.map((part, partIndex) => {
              if (partIndex % 2 === 1) {
                return <strong key={partIndex} className="font-semibold text-foreground">{part}</strong>;
              }
              return part;
            })}
          </div>
        );
      }

      // Handle italic links
      if (paragraph.includes('*') && paragraph.includes('[') && paragraph.includes('](')) {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = paragraph.split(linkRegex);
        
        return (
          <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            {parts.map((part, partIndex) => {
              // Check if this part is a URL (every third element after splitting)
              if (partIndex % 3 === 2) {
                const linkText = parts[partIndex - 1];
                return (
                  <a
                    key={partIndex}
                    href={part}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkText}
                  </a>
                );
              }
              // Skip link text parts (every second element)
              if (partIndex % 3 === 1) {
                return null;
              }
              // Format italic text
              return part.split('*').map((textPart, textIndex) => {
                if (textIndex % 2 === 1) {
                  return <em key={textIndex} className="italic">{textPart}</em>;
                }
                return textPart;
              });
            })}
          </p>
        );
      }

      // Regular paragraphs
      if (paragraph.trim()) {
        return (
          <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraph}
          </p>
        );
      }

      return null;
    }).filter(Boolean);
  };

  const canonicalUrl = `https://screentrackk.com/blog/${slug}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitle || post.title,
    "description": post.seoDescription || post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ScreenTrackk",
      "url": "https://screentrackk.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "datePublished": post.publishDate,
    "keywords": post.tags.join(", "),
    "url": canonicalUrl,
    "image": "https://screentrackk.com/og-image.png"
  };

  return (
    <>
      <head>
        <link rel="canonical" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article>
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <time dateTime={post.publishDate}>
                {formatDate(post.publishDate)}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </div>

          {/* Call to Action */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Ready to Take Control of Your Digital Life?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Join thousands who've transformed their digital habits with ScreenTrackk - the privacy-first Chrome extension that tracks your screen time and helps you build better browsing habits. Get real-time insights into your productivity patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link 
                href="https://screentrackk.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download ScreenTrackk - Free Chrome Extension →
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                $4.99/week • Privacy-first • 10,000+ active users
              </p>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
          >
            ← Read More Articles
          </Link>
        </nav>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 dark:text-gray-400">
              © 2024 ScreenTrackk Blog. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link 
                href="https://screentrackk.com" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                ScreenTrackk.com
              </Link>
              <Link 
                href="https://screentrackk.com/privacy" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
} 