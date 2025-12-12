'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function LoadingLogo() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        <Image
          src="/logo-light.svg"
          alt="NOVELLA"
          width={80}
          height={80}
          className="object-contain"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-[#B76E79]/20 to-[#D4AF37]/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}
