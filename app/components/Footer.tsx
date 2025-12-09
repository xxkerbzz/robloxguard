import Link from 'next/link';

interface FooterItem {
  label: string;
  url: string;
}

interface FooterProps {
  items?: FooterItem[];
}

const defaultFooterItems: FooterItem[] = [
  { label: 'Product', url: '/product' },
  { label: 'Features', url: '/features' },
  { label: 'Pricing', url: '/pricing' },
  { label: 'About', url: '/about' },
  { label: 'Contact', url: '/contact' },
  { label: 'FAQ', url: '/faq' },
  { label: 'Security', url: '/security' },
  { label: 'Privacy', url: '/privacy' },
  { label: 'Terms', url: '/terms' },
];

export default function Footer({ items = defaultFooterItems }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">RobloxGuard</h3>
            <p className="text-gray-400 mb-4">
              Stop Roblox scams before they happen. Real-time monitoring and instant alerts to protect your child's account.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {items
                .filter((item) => ['Product', 'Features', 'Pricing'].includes(item.label))
                .map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {items
                .filter((item) => ['About', 'Contact', 'FAQ', 'Security', 'Privacy', 'Terms'].includes(item.label))
                .map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} RobloxGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

