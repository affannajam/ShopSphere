'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Laptop,
  Apple,
  Gem,
  type LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const icons: React.FC<LucideProps>[] = [
  ShoppingBag,
  ShoppingCart,
  Gem,
  Laptop,
  Apple,
];

export function AnimatedLogo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2500); // Change icon every 2.5 seconds to match animation

    return () => clearInterval(interval);
  }, []);

  const Icon = icons[currentIndex];

  return (
    <div className="relative h-10 w-10 md:h-12 md:w-12">
      {icons.map((IconComponent, index) => (
        <IconComponent
          key={index}
          className={cn(
            'absolute inset-0 h-full w-full text-accent transition-opacity duration-500',
            currentIndex === index
              ? 'opacity-100 animate-custom-bounce'
              : 'opacity-0'
          )}
          style={{ animationDuration: '2.5s' }}
        />
      ))}
    </div>
  );
}
