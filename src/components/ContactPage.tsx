import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Award, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@edufocus.vn',
      description: 'Gửi email cho chúng tôi bất cứ lúc nào',
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Điện thoại',
      details: '(024) 1234-5678',
      description: 'Hotline hỗ trợ 24/7',
      color: 'bg-green-500'
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      details: 'Hồ Chí Minh, Việt Nam',
      description: 'Văn phòng chính của chúng tôi',
      color: 'bg-red-500'
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      details: 'T2 - T6: 8:00 - 18:00',
      description: 'Thời gian hỗ trợ trực tiếp',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { icon: Users, number: '50K+', label: 'Sinh viên tin tưởng' },
    { icon: MessageCircle, number: '24/7', label: 'Hỗ trợ khách hàng' },
    { icon: Award, number: '4.9/5', label: 'Đánh giá dịch vụ' },
    { icon: Mail, number: '<2h', label: 'Thời gian phản hồi' }
  ];

  const faqs = [
    {
      question: 'Làm thế nào để đăng ký tài khoản EduFocus?',
      answer: 'Bạn có thể đăng ký tài khoản miễn phí bằng cách click vào nút "Bắt đầu học" trên trang chủ và điền thông tin cần thiết.'
    },
    {
      question: 'EduFocus có miễn phí không?',
      answer: 'EduFocus cung cấp nhiều tính năng miễn phí. Chúng tôi cũng có các gói premium với tính năng nâng cao.'
    },
    {
      question: 'Tôi có thể sử dụng EduFocus trên điện thoại không?',
      answer: 'Có, EduFocus được tối ưu hóa cho mọi thiết bị, bao gồm điện thoại, tablet và máy tính.'
    },
    {
      question: 'Làm thế nào để liên hệ hỗ trợ kỹ thuật?',
      answer: 'Bạn có thể liên hệ qua email support@edufocus.vn hoặc gọi hotline (024) 1234-5678.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 dark:border-indigo-700/50 rounded-full mb-8">
            <MessageCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" />
            <span className="text-indigo-700 dark:text-indigo-300 font-medium font-poppins">Liên hệ với chúng tôi</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
            Chúng tôi luôn{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient-x">
              sẵn sàng
            </span>
            <br />
            hỗ trợ bạn
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-inter">
            Có câu hỏi hoặc cần hỗ trợ? Đội ngũ EduFocus luôn sẵn sàng giúp đỡ bạn 24/7
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-bounce-gentle" style={{ animationDelay: `${0.1 * index}s` }}>
                <stat.icon className="h-10 w-10 text-white" />
              </div>
              <div className="text-3xl font-bold font-poppins text-indigo-600 dark:text-indigo-400 mb-2 animate-glow">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium font-inter">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Form */}
          <div className="animate-fade-in-left">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
                Gửi tin nhắn cho chúng tôi
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-300 font-inter"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-300 font-inter"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                    Chủ đề *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-300 font-inter"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="support">Hỗ trợ kỹ thuật</option>
                    <option value="billing">Thanh toán</option>
                    <option value="feature">Đề xuất tính năng</option>
                    <option value="partnership">Hợp tác</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none font-inter"
                    placeholder="Nhập tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group font-poppins"
                >
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  <span>Gửi tin nhắn</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-right">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 animate-scale-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <info.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-900 dark:text-white font-semibold font-inter mb-1">
                        {info.details}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-inter">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-4">
                Kết nối với chúng tôi
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', color: 'hover:bg-blue-600', name: 'Facebook' },
                  { icon: Twitter, href: '#', color: 'hover:bg-sky-500', name: 'Twitter' },
                  { icon: Instagram, href: '#', color: 'hover:bg-pink-600', name: 'Instagram' },
                  { icon: Youtube, href: '#', color: 'hover:bg-red-600', name: 'YouTube' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center ${social.color} text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 animate-bounce-gentle`}
                    style={{ animationDelay: `${0.1 * index}s` }}
                    title={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-inter">
              Tìm câu trả lời nhanh chóng cho những thắc mắc phổ biến
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 animate-scale-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-inter">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white animate-fade-in-up">
          <h3 className="text-3xl font-bold mb-4 font-poppins">
            Bạn đã sẵn sàng bắt đầu?
          </h3>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto font-inter">
            Tham gia cộng đồng 50,000+ sinh viên đang học tập hiệu quả với EduFocus
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg font-poppins">
            Bắt đầu học ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;