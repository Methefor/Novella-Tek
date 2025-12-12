'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showText?: boolean;
}

const sizes = {
  sm: { width: 32, height: 32, text: 'text-lg' },
  md: { width: 40, height: 40, text: 'text-xl' },
  lg: { width: 48, height: 48, text: 'text-2xl' },
};

export function Logo({
  className = '',
  size = 'md',
  href,
  showText = true,
}: LogoProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === 'system'
      ? systemTheme
      : theme
    : 'light';

  // Logo.svg kullan (SVG her temada çalışır, CSS ile renk değişir)
  const logoSrc = '/Logo.svg';
  const { width, height, text } = sizes[size];

  const LogoContent = (
    <div className={`flex items-center gap-2 group ${className}`}>
      <div className="relative">
        <Image
          src={logoSrc}
          alt="NOVELLA"
          width={width}
          height={height}
          className="object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          priority
        />
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-[#B76E79]/20 to-[#D4AF37]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </div>

      {showText && (
        <span
          className={`font-['Cormorant_Garamond'] font-bold ${text} tracking-wide group-hover:text-[#D4AF37] transition-colors`}
        >
          NOVELLA
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
}
