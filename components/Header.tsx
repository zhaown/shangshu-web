'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  const switchLocale = locale === 'zh' ? 'en' : 'zh';
  const currentPath = pathname.replace(`/${locale}`, '') || '/';
  const switchLocalePath = `/${switchLocale}${currentPath === '/' ? '' : currentPath}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              {locale === 'zh' ? '商澍科技' : 'Shangshu'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#0066FF] ${
                  pathname === item.href ? 'text-[#0066FF]' : 'text-gray-600'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Language Switch & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href={switchLocalePath}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-[#0066FF] transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'zh' ? 'EN' : '中文'}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`block py-2 text-sm font-medium transition-colors hover:text-[#0066FF] ${
                  pathname === item.href ? 'text-[#0066FF]' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
