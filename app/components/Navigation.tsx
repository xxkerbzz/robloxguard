'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  label: string;
  url: string;
  dropdown?: NavItem[];
}

interface NavigationProps {
  items?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', url: '/' },
  { label: 'Product', url: '/product' },
  { label: 'Features', url: '/features' },
  { label: 'Pricing', url: '/pricing' },
  {
    label: 'Resources',
    url: '/resources',
    dropdown: [
      { label: 'Roblox Parental Controls', url: '/resources/roblox-parental-controls' },
      { label: 'Roblox Account Security', url: '/resources/roblox-account-security' },
      { label: 'Roblox Fraud Prevention', url: '/resources/roblox-fraud-prevention' },
      { label: 'Roblox Spending Management', url: '/resources/roblox-spending-management' },
      { label: 'Roblox Safety Education', url: '/resources/roblox-safety-education' },
    ],
  },
  { label: 'About', url: '/about' },
  { label: 'Contact', url: '/contact' },
];

export default function Navigation({ items = defaultNavItems }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              RobloxGuard
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {items.map((item) => (
              <div
                key={item.url}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.url)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <div className="flex items-center cursor-pointer py-2 text-gray-900 hover:text-blue-600 transition-colors">
                      <span>{item.label}</span>
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openDropdown === item.url ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {openDropdown === item.url && (
                      <div className="absolute left-0 top-full pt-1 z-50">
                        <div className="bg-white border rounded-md shadow-lg py-2 min-w-[200px]">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.url}
                              href={dropdownItem.url}
                              className="block px-4 py-2 text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url}
                    className="text-gray-900 hover:text-blue-600 transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {items.map((item) => (
              <div key={item.url}>
                {item.dropdown ? (
                  <div className="py-2">
                    <div className="text-gray-900 font-medium py-2">{item.label}</div>
                    <div className="pl-4">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.url}
                          href={dropdownItem.url}
                          className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.url}
                    className="block py-2 text-gray-900 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

