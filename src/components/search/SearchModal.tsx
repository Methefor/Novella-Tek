'use client';

import { useLocale } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  'Altın kolye',
  'Gümüş bilezik',
  'Elmas küpe',
  'Rose gold yüzük',
  'İnci kolye',
  'Çelik bilezik',
];

const trendingProducts = [
  {
    id: 1,
    name: 'Gold Necklace',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Silver Bracelet',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Diamond Earrings',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Rose Gold Ring',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop',
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recent = localStorage.getItem('recentSearches');
      if (recent) {
        setRecentSearches(JSON.parse(recent));
      }
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5);
    setRecentSearches(updated);

    if (typeof window !== 'undefined') {
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }

    setTimeout(() => {
      window.location.href = `/${locale}/collections?search=${encodeURIComponent(
        searchQuery
      )}`;
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const clearRecent = () => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('recentSearches');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-3xl z-50"
          >
            <div className="bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-r from-[#D4AF37]/10 via-[#B76E79]/10 to-[#D4AF37]/10 p-6 border-b border-border/30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <div className="relative flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B76E79] flex items-center justify-center shadow-lg">
                    <Search className="w-6 h-6 text-white" />
                  </div>

                  <input
                    type="text"
                    placeholder="Ürün, kategori veya marka ara..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-xl md:text-2xl font-['Cormorant_Garamond'] font-medium outline-none placeholder:text-muted-foreground/50"
                    autoFocus
                  />

                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-10 h-10 hover:bg-muted/50 rounded-xl transition-all duration-200 flex items-center justify-center group"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                {/* Search hint */}
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>Enter tuşuna basın veya aşağıdan seçin</span>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="p-6 space-y-8">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <h3 className="font-semibold">Son Aramalar</h3>
                        </div>
                        <button
                          onClick={clearRecent}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1 rounded-full hover:bg-muted"
                        >
                          Temizle
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * index }}
                            onClick={() => handleSearch(search)}
                            className="group px-4 py-2 bg-muted hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/30 border border-transparent rounded-full text-sm transition-all duration-200 flex items-center gap-2"
                          >
                            <Clock className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                            {search}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Popular Searches */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-[#B76E79]/20 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <h3 className="font-semibold">En Çok Arananlar</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {popularSearches.map((search, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * index }}
                          onClick={() => handleSearch(search)}
                          className="group px-4 py-3 bg-gradient-to-br from-[#D4AF37]/10 to-[#B76E79]/10 hover:from-[#D4AF37]/20 hover:to-[#B76E79]/20 rounded-xl text-sm transition-all duration-200 flex items-center justify-between border border-[#D4AF37]/20"
                        >
                          <span className="font-medium">{search}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Trending Products */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B76E79]/20 to-[#D4AF37]/20 flex items-center justify-center">
                        <Star className="w-4 h-4 text-[#B76E79]" />
                      </div>
                      <h3 className="font-semibold">Öne Çıkan Ürünler</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {trendingProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * index }}
                        >
                          <Link
                            href={`/${locale}/products/${product.id}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 p-3 hover:bg-muted/50 rounded-2xl transition-all duration-200 border border-transparent hover:border-border/50"
                          >
                            <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-muted">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate group-hover:text-[#D4AF37] transition-colors">
                                {product.name}
                              </p>
                              <p className="text-[#D4AF37] font-bold text-lg">
                                {product.price} TL
                              </p>
                            </div>

                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-muted/30 border-t border-border/30">
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-background/50 rounded border border-border/30">
                      Enter
                    </kbd>
                    <span>Ara</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-background/50 rounded border border-border/30">
                      Esc
                    </kbd>
                    <span>Kapat</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
