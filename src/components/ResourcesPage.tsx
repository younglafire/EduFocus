import React, { useState } from 'react';
import { BookOpen, Download, FileText, Video, Headphones, Image, Search, Filter, ExternalLink, Eye, Heart } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'video' | 'audio' | 'document' | 'image' | 'template';
  category: string;
  downloadCount: number;
  size: string;
  format: string;
  thumbnail: string;
  downloadUrl: string;
  previewUrl?: string;
  isFree: boolean;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Cẩm nang học tập hiệu quả cho sinh viên',
    description: 'Tài liệu tổng hợp các phương pháp học tập hiệu quả, quản lý thời gian và kỹ thuật ghi nhớ.',
    type: 'ebook',
    category: 'Kỹ năng học tập',
    downloadCount: 15420,
    size: '2.5 MB',
    format: 'PDF',
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    downloadUrl: '#',
    previewUrl: '#',
    isFree: true,
    tags: ['Học tập', 'Kỹ năng', 'Sinh viên']
  },
  {
    id: '2',
    title: 'Video hướng dẫn Python cơ bản',
    description: 'Series video 20 bài học Python từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu.',
    type: 'video',
    category: 'Lập trình',
    downloadCount: 8934,
    size: '1.2 GB',
    format: 'MP4',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    downloadUrl: '#',
    previewUrl: '#',
    isFree: true,
    tags: ['Python', 'Lập trình', 'Video']
  },
  {
    id: '3',
    title: 'Template PowerPoint chuyên nghiệp',
    description: 'Bộ sưu tập 50+ template PowerPoint đẹp mắt cho thuyết trình học tập và công việc.',
    type: 'template',
    category: 'Thiết kế',
    downloadCount: 12567,
    size: '45 MB',
    format: 'PPTX',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    downloadUrl: '#',
    isFree: false,
    tags: ['PowerPoint', 'Template', 'Thiết kế']
  },
  {
    id: '4',
    title: 'Podcast Tiếng Anh giao tiếp',
    description: 'Bộ sưu tập 100 tập podcast luyện nghe và phát âm tiếng Anh cho sinh viên.',
    type: 'audio',
    category: 'Ngoại ngữ',
    downloadCount: 6789,
    size: '500 MB',
    format: 'MP3',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    downloadUrl: '#',
    isFree: true,
    tags: ['Tiếng Anh', 'Podcast', 'Nghe']
  },
  {
    id: '5',
    title: 'Tài liệu ôn thi TOEIC',
    description: 'Bộ đề thi TOEIC mẫu với đáp án chi tiết và phương pháp làm bài hiệu quả.',
    type: 'document',
    category: 'Ngoại ngữ',
    downloadCount: 9876,
    size: '15 MB',
    format: 'PDF',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    downloadUrl: '#',
    previewUrl: '#',
    isFree: true,
    tags: ['TOEIC', 'Tiếng Anh', 'Thi cử']
  },
  {
    id: '6',
    title: 'Infographic kỹ năng mềm',
    description: 'Bộ sưu tập infographic về các kỹ năng mềm cần thiết trong công việc.',
    type: 'image',
    category: 'Kỹ năng mềm',
    downloadCount: 4321,
    size: '25 MB',
    format: 'PNG/JPG',
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    downloadUrl: '#',
    previewUrl: '#',
    isFree: true,
    tags: ['Infographic', 'Kỹ năng mềm', 'Hình ảnh']
  }
];

const categories = ['Tất cả', 'Kỹ năng học tập', 'Lập trình', 'Thiết kế', 'Ngoại ngữ', 'Kỹ năng mềm'];
const types = ['Tất cả', 'ebook', 'video', 'audio', 'document', 'image', 'template'];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'ebook': return BookOpen;
    case 'video': return Video;
    case 'audio': return Headphones;
    case 'document': return FileText;
    case 'image': return Image;
    case 'template': return FileText;
    default: return FileText;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'ebook': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'video': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    case 'audio': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    case 'document': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'image': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    case 'template': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedType, setSelectedType] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tất cả' || resource.category === selectedCategory;
    const matchesType = selectedType === 'Tất cả' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-200/50 dark:border-green-700/50 rounded-full mb-8">
            <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
            <span className="text-green-700 dark:text-green-300 font-medium font-poppins">Tài nguyên học tập</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
            Kho tài nguyên{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 animate-gradient-x">
              phong phú
            </span>
            <br />
            cho sinh viên
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-inter">
            Tải miễn phí hàng nghìn tài liệu, video, audio và template chất lượng cao để hỗ trợ học tập
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tài nguyên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white transition-all duration-300 font-inter"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-green-300 dark:hover:border-green-500 transition-all duration-300 font-poppins"
            >
              <Filter className="h-5 w-5" />
              <span>Bộ lọc</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-down">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    Danh mục
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-inter ${
                          selectedCategory === category
                            ? 'bg-green-500 text-white shadow-glow-green'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    Loại tài nguyên
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-inter capitalize ${
                          selectedType === type
                            ? 'bg-blue-500 text-white shadow-glow'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-600 dark:text-gray-400 font-inter">
            Tìm thấy <span className="font-semibold text-green-600 dark:text-green-400">{filteredResources.length}</span> tài nguyên
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {filteredResources.map((resource, index) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div
                key={resource.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden animate-scale-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Resource Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Type badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold font-poppins flex items-center ${getTypeColor(resource.type)}`}>
                    <TypeIcon className="h-4 w-4 mr-1" />
                    {resource.type}
                  </div>

                  {/* Free badge */}
                  {resource.isFree && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold font-poppins">
                      Miễn phí
                    </div>
                  )}

                  {/* Action buttons overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      {resource.previewUrl && (
                        <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Eye className="h-5 w-5 text-white" />
                        </button>
                      )}
                      <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Download className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resource Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full font-inter">
                      {resource.category}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors font-poppins line-clamp-2">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 font-inter">
                    {resource.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        <span className="font-inter">{resource.downloadCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-inter">{resource.size}</span>
                      </div>
                    </div>
                    <span className="font-semibold font-inter">{resource.format}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded font-inter"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group font-poppins">
                      <Download className="h-4 w-4 mr-2" />
                      <span>Tải xuống</span>
                    </button>
                    {resource.previewUrl && (
                      <button className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
              Không tìm thấy tài nguyên nào
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-inter">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white animate-fade-in-up">
          <h3 className="text-3xl font-bold mb-4 font-poppins">
            Bạn có tài nguyên chất lượng muốn chia sẻ?
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto font-inter">
            Tham gia cộng đồng chia sẻ tài nguyên và nhận được phần thưởng hấp dẫn
          </p>
          <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg font-poppins">
            Chia sẻ tài nguyên
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;