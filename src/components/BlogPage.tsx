import React, { useState } from 'react';
import { Calendar, User, Clock, Tag, Search, TrendingUp, MessageCircle, Heart, Share2, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Phương pháp học tập hiệu quả mà mọi sinh viên nên biết',
    excerpt: 'Khám phá những phương pháp học tập được khoa học chứng minh giúp tăng hiệu quả học tập lên 300%.',
    content: '',
    author: 'Nguyễn Minh Anh',
    authorAvatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100',
    publishDate: '2024-01-15',
    readTime: '8 phút',
    category: 'Kỹ năng học tập',
    tags: ['Học tập', 'Phương pháp', 'Hiệu quả'],
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 15420,
    likes: 892,
    comments: 156,
    featured: true
  },
  {
    id: '2',
    title: 'Cách sử dụng AI để hỗ trợ học tập trong thời đại 4.0',
    excerpt: 'Tìm hiểu cách tận dụng trí tuệ nhân tạo để tối ưu hóa quá trình học tập và nghiên cứu.',
    content: '',
    author: 'Trần Hoàng Nam',
    authorAvatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=100',
    publishDate: '2024-01-12',
    readTime: '12 phút',
    category: 'Công nghệ',
    tags: ['AI', 'Công nghệ', 'Học tập'],
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 12567,
    likes: 743,
    comments: 89,
    featured: true
  },
  {
    id: '3',
    title: 'Quản lý thời gian hiệu quả với phương pháp Pomodoro',
    excerpt: 'Hướng dẫn chi tiết cách áp dụng kỹ thuật Pomodoro để tăng năng suất học tập.',
    content: '',
    author: 'Lê Thị Hương',
    authorAvatar: 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg?auto=compress&cs=tinysrgb&w=100',
    publishDate: '2024-01-10',
    readTime: '6 phút',
    category: 'Quản lý thời gian',
    tags: ['Pomodoro', 'Thời gian', 'Năng suất'],
    thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 9876,
    likes: 567,
    comments: 78,
    featured: false
  },
  {
    id: '4',
    title: 'Bí quyết ghi nhớ thông tin lâu dài với Mind Map',
    excerpt: 'Khám phá sức mạnh của sơ đồ tư duy trong việc ghi nhớ và tổ chức thông tin.',
    content: '',
    author: 'Phạm Đức Minh',
    authorAvatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100',
    publishDate: '2024-01-08',
    readTime: '10 phút',
    category: 'Kỹ năng học tập',
    tags: ['Mind Map', 'Ghi nhớ', 'Tư duy'],
    thumbnail: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 8234,
    likes: 456,
    comments: 67,
    featured: false
  },
  {
    id: '5',
    title: 'Làm thế nào để duy trì động lực học tập dài hạn',
    excerpt: 'Những chiến lược tâm lý giúp bạn duy trì nhiệt huyết học tập suốt quá trình đại học.',
    content: '',
    author: 'Vũ Thu Trang',
    authorAvatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=100',
    publishDate: '2024-01-05',
    readTime: '7 phút',
    category: 'Tâm lý học',
    tags: ['Động lực', 'Tâm lý', 'Kiên trì'],
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 11234,
    likes: 678,
    comments: 123,
    featured: false
  },
  {
    id: '6',
    title: 'Chuẩn bị CV và phỏng vấn xin việc cho sinh viên mới ra trường',
    excerpt: 'Hướng dẫn từng bước tạo CV ấn tượng và chuẩn bị phỏng vấn thành công.',
    content: '',
    author: 'Ngô Văn Đức',
    authorAvatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100',
    publishDate: '2024-01-03',
    readTime: '15 phút',
    category: 'Nghề nghiệp',
    tags: ['CV', 'Phỏng vấn', 'Việc làm'],
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 13456,
    likes: 789,
    comments: 234,
    featured: false
  }
];

const categories = ['Tất cả', 'Kỹ năng học tập', 'Công nghệ', 'Quản lý thời gian', 'Tâm lý học', 'Nghề nghiệp'];

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tất cả' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200/50 dark:border-orange-700/50 rounded-full mb-8">
            <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-3" />
            <span className="text-orange-700 dark:text-orange-300 font-medium font-poppins">Blog học tập</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
            Chia sẻ{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 animate-gradient-x">
              kiến thức
            </span>
            <br />
            và kinh nghiệm
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-inter">
            Khám phá những bài viết hữu ích về phương pháp học tập, kỹ năng mềm và kinh nghiệm từ cộng đồng sinh viên
          </p>
        </div>

        {/* Search and Categories */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white transition-all duration-300 font-inter"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 font-poppins ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-glow-pink'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-8 flex items-center">
              <TrendingUp className="h-6 w-6 text-orange-500 mr-2" />
              Bài viết nổi bật
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {/* Post Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold font-poppins">
                      {post.category}
                    </div>

                    {/* Featured badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold font-poppins">
                      Nổi bật
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Meta info */}
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="font-medium font-inter">{post.author}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="font-inter">{formatDate(post.publishDate)}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="font-inter">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors font-poppins line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-inter">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded font-inter"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="font-inter">{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span className="font-inter">{post.comments}</span>
                        </div>
                      </div>
                      <button className="flex items-center text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-700 dark:hover:text-orange-300 transition-colors font-poppins">
                        <span className="mr-1">Đọc tiếp</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-8">
            Tất cả bài viết
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden animate-scale-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Post Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold font-poppins">
                    {post.category}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Meta info */}
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="font-medium font-inter">{post.author}</span>
                    <span className="mx-2">•</span>
                    <span className="font-inter">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors font-poppins line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 font-inter">
                    {post.excerpt}
                  </p>

                  {/* Stats and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="font-inter">{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="font-inter">{post.comments}</span>
                      </div>
                    </div>
                    <button className="flex items-center text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-700 dark:hover:text-orange-300 transition-colors font-poppins">
                      <span className="mr-1">Đọc</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-inter">
              Thử thay đổi từ khóa tìm kiếm hoặc danh mục
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-white animate-fade-in-up">
          <h3 className="text-3xl font-bold mb-4 font-poppins">
            Đăng ký nhận bài viết mới nhất
          </h3>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto font-inter">
            Nhận thông báo khi có bài viết mới về học tập, kỹ năng và kinh nghiệm từ cộng đồng EduFocus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-6 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 font-inter"
            />
            <button className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg font-poppins">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;