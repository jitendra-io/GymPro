import React from 'react';
import { ArrowRight, Clock, User, Bookmark } from 'lucide-react';

export default function Blogs() {
  const posts = [
    {
      title: 'The Ultimate Guide to Pre-Workout Nutrition',
      excerpt: 'Maximize your energy and performance by fueling your body correctly before you step into the gym. We break down the macros and timing.',
      category: 'Nutrition',
      author: 'Dr. Sarah Jenkins',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
    },
    {
      title: 'Mastering the Deadlift: Form and Function',
      excerpt: 'The deadlift is the king of compound exercises. Learn how to perfect your stance, grip, and pull to safely lift heavier weights.',
      category: 'Training',
      author: 'Alex Mercer',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
    },
    {
      title: 'Recovery Secrets of Elite Athletes',
      excerpt: 'What happens outside the gym is just as important as what happens inside. Discover the top recovery methods used by the pros.',
      category: 'Wellness',
      author: 'Coach Marcus',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    },
    {
      title: 'Building a Sustainable Fitness Habit',
      excerpt: 'Consistency is the hardest part of any fitness journey. Learn psychological tricks to keep yourself motivated year-round.',
      category: 'Mindset',
      author: 'Emily Davis',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    }
  ];

  return (
    <div className="relative text-white min-h-screen bg-gymDark">
      {/* Header */}
      <div className="relative pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
          The <span className="text-gymYellow glow-text-yellow">Gympro</span> Blog
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Insights, tips, and strategies to help you conquer your goals. Written by our expert coaches and nutritionists.
        </p>
      </div>

      {/* Featured/Latest Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <article 
              key={idx} 
              className="glass rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover filter grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gymDark via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-gymGreen text-gymDark text-xs font-black px-3 py-1 uppercase rounded-full tracking-wider">
                  {post.category}
                </div>
                <button className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-gymYellow hover:text-gymDark text-white rounded-full backdrop-blur-sm transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-gymGreen transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                  <div className="flex flex-col gap-1 text-xs text-gray-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <button className="text-gymYellow hover:text-white font-black uppercase tracking-widest text-sm flex items-center gap-2 transition-colors">
                    Read <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="border-2 border-white/20 hover:border-gymGreen text-white hover:text-gymGreen font-bold px-8 py-3 uppercase tracking-widest text-sm transition-all rounded-full">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
