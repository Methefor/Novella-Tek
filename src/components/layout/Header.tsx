'use client';

import { Logo } from '@/components/brand';
import { CartButton } from '@/components/cart';
import { FavoritesButton } from '@/components/favorites';
import { SearchButton } from '@/components/search';
import { Container, LanguageSwitcher, ThemeToggle } from '@/components/ui';
import { useLocale, useTranslations } from '@/lib/i18n-client';
import { useAppStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80;
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
};

export function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const { isScrolled, setIsScrolled, openMobileMenu } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="transition-transform hover:scale-105"
          >
            <Logo />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {t('home')}
            </button>

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {t('collections')}
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg p-2"
                  >
                    <Link
                      href={`/${locale}/collections/necklaces`}
                      className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Kolyeler
                    </Link>
                    <Link
                      href={`/${locale}/collections/bracelets`}
                      className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Bilezikler
                    </Link>
                    <Link
                      href={`/${locale}/collections/earrings`}
                      className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Küpeler
                    </Link>
                    <Link
                      href={`/${locale}/collections/rings`}
                      className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Yüzükler
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {t('about')}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {t('contact')}
            </button>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <SearchButton />
            <FavoritesButton />
            <CartButton />
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={openMobileMenu}
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
