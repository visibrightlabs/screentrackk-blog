import Link from "next/link";
import { getBlogPosts, getFeaturedPosts } from "./lib/blog-data";

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const allPosts = getBlogPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              ScreenTrackk Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Expert insights on digital wellness, productivity, and building healthier relationships with technology
            </p>
            <div className="flex justify-center">
              <Link 
                href="https://screentrackk.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get ScreenTrackk - Free Chrome Extension →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200 h-full">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <time dateTime={post.publishDate}>
                          {formatDate(post.publishDate)}
                        </time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8">All Articles</h2>
          <div className="space-y-8">
            {allPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <time dateTime={post.publishDate}>
                        {formatDate(post.publishDate)}
                      </time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>By {post.author}</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Digital Habits?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            Join thousands who've gained control over their screen time with ScreenTrackk's privacy-first Chrome extension. Track your browsing habits, identify productivity patterns, and build healthier digital relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="https://screentrackk.com"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download ScreenTrackk Free →
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Privacy-first • $4.99/week • Chrome Extension
            </p>
          </div>
        </section>
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
  );
}
