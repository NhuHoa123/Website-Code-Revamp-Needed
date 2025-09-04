import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Heart
} from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'Về chúng tôi', href: '#about' },
      { name: 'Tuyển dụng', href: '#' },
      { name: 'Tin tức', href: '#' },
      { name: 'Liên hệ', href: '#contact' }
    ],
    products: [
      { name: 'Bút viết cao cấp', href: '#' },
      { name: 'Sổ tay & Notebook', href: '#' },
      { name: 'Phụ kiện văn phòng', href: '#' },
      { name: 'Thiết bị điện tử', href: '#' }
    ],
    support: [
      { name: 'Chính sách bảo hành', href: '#' },
      { name: 'Hướng dẫn mua hàng', href: '#' },
      { name: 'Chính sách đổi trả', href: '#' },
      { name: 'Câu hỏi thường gặp', href: '#' }
    ],
    legal: [
      { name: 'Điều khoản sử dụng', href: '#' },
      { name: 'Chính sách bảo mật', href: '#' },
      { name: 'Chính sách cookie', href: '#' },
      { name: 'Quy định thanh toán', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Đăng Ký Nhận Tin Tức Mới Nhất
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Nhận thông tin về sản phẩm mới, ưu đãi đặc biệt và những xu hướng văn phòng phẩm hiện đại nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-blue-400"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                <Mail className="w-4 h-4 mr-2" />
                Đăng ký
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                ModernOffice
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Chúng tôi tự hào là nhà cung cấp văn phòng phẩm cao cấp hàng đầu Việt Nam, 
                mang đến những sản phẩm chất lượng vượt trội với thiết kế hiện đại và 
                công nghệ tiên tiến.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-green-400" />
                <span>(028) 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>info@modernoffice.vn</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Công ty</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Sản phẩm</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Hỗ trợ</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-white/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-300 text-sm">
            © 2025 ModernOffice. Tất cả quyền được bảo lưu.
          </div>
          
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <span>Được phát triển với</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>tại Việt Nam</span>
          </div>

          <div className="flex space-x-6">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}