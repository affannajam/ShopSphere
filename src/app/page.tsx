'use client';
import {
  ShoppingBag,
  Headphones,
  Shirt,
  BookOpen,
  Laptop,
  Smartphone,
  Watch,
  Camera,
  Gem,
  Speaker,
  Keyboard,
  Mouse,
  Gamepad2,
  Gift,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/data';
import { AnimatedLogo } from '@/components/animated-logo';

const Icon = ({ icon: IconCmp, className }: { icon: React.ElementType, className?: string }) => {
    return <IconCmp className={`absolute text-white/30 ${className}`} />;
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen text-white flex items-center justify-center text-center overflow-hidden animated-hero-gradient">
        {/* Background Icons */}
        <div className="absolute inset-0 z-10 opacity-40">
          <Headphones className="absolute top-[10%] left-[5%] h-12 w-12 text-white/30" style={{ animation: 'shuffle-1 15s ease-in-out infinite alternate' }} />
          <Shirt className="absolute top-[20%] right-[10%] h-10 w-10 text-white/30" style={{ animation: 'shuffle-2 18s ease-in-out infinite alternate' }} />
          <BookOpen className="absolute bottom-[15%] left-[15%] h-8 w-8 text-white/30" style={{ animation: 'shuffle-3 20s ease-in-out infinite alternate' }} />
          <ShoppingBag className="absolute bottom-[10%] right-[5%] h-14 w-14 text-white/30" style={{ animation: 'shuffle-1 16s ease-in-out infinite alternate' }} />
          <Laptop className="absolute top-[50%] left-[20%] h-16 w-16 text-white/30" style={{ animation: 'shuffle-2 19s ease-in-out infinite alternate' }} />
          <Smartphone className="absolute top-[15%] left-[45%] h-8 w-8 text-white/30" style={{ animation: 'shuffle-3 22s ease-in-out infinite alternate' }} />
          <Watch className="absolute bottom-[25%] right-[25%] h-10 w-10 text-white/30" style={{ animation: 'shuffle-1 17s ease-in-out infinite alternate' }} />
          <Camera className="absolute top-[5%] right-[30%] h-9 w-9 text-white/30" style={{ animation: 'shuffle-2 21s ease-in-out infinite alternate' }} />
          <Gem className="absolute bottom-[5%] left-[75%] h-12 w-12 text-white/30" style={{ animation: 'shuffle-3 18s ease-in-out infinite alternate' }} />
          <Speaker className="absolute top-[70%] left-[5%] h-10 w-10 text-white/30" style={{ animation: 'shuffle-1 20s ease-in-out infinite alternate' }} />
          <Keyboard className="absolute top-[55%] right-[15%] h-12 w-12 text-white/30" style={{ animation: 'shuffle-2 15s ease-in-out infinite alternate' }} />
          <Mouse className="absolute bottom-[40%] left-[30%] h-8 w-8 text-white/30" style={{ animation: 'shuffle-3 19s ease-in-out infinite alternate' }} />
          <Gamepad2 className="absolute top-[80%] right-[50%] h-11 w-11 text-white/30" style={{ animation: 'shuffle-1 16s ease-in-out infinite alternate' }} />
          <Gift className="absolute top-[5%] left-[25%] h-9 w-9 text-white/30" style={{ animation: 'shuffle-2 23s ease-in-out infinite alternate' }} />
        </div>
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
            <span className="font-light whitespace-nowrap">Welcome to</span>
            <div className="flex items-center justify-center gap-6">
              <span className="animated-text-gradient text-transparent bg-clip-text">ShopSphere</span>
              <AnimatedLogo />
            </div>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 py-4">
            Discover a world of quality products, curated just for you.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 text-white font-bold uppercase"
          >
            <Link href="#products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative bg-[#211026] py-16 sm:py-24 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-10 opacity-10">
          <Headphones className="absolute top-[5%] left-[15%] h-12 w-12 text-orange-400" style={{ animation: 'shuffle-1 15s ease-in-out infinite alternate' }} />
          <Shirt className="absolute top-[10%] right-[15%] h-10 w-10 text-orange-400" style={{ animation: 'shuffle-2 18s ease-in-out infinite alternate' }} />
          <BookOpen className="absolute bottom-[5%] left-[25%] h-8 w-8 text-orange-400" style={{ animation: 'shuffle-3 20s ease-in-out infinite alternate' }} />
          <ShoppingBag className="absolute bottom-[10%] right-[10%] h-14 w-14 text-orange-400" style={{ animation: 'shuffle-1 16s ease-in-out infinite alternate' }} />
          <Laptop className="absolute top-[40%] left-[25%] h-16 w-16 text-orange-400" style={{ animation: 'shuffle-2 19s ease-in-out infinite alternate' }} />
          <Smartphone className="absolute top-[25%] left-[50%] h-8 w-8 text-orange-400" style={{ animation: 'shuffle-3 22s ease-in-out infinite alternate' }} />
          <Watch className="absolute bottom-[20%] right-[30%] h-10 w-10 text-orange-400" style={{ animation: 'shuffle-1 17s ease-in-out infinite alternate' }} />
          <Camera className="absolute top-[8%] right-[40%] h-9 w-9 text-orange-400" style={{ animation: 'shuffle-2 21s ease-in-out infinite alternate' }} />
          <Gem className="absolute bottom-[5%] left-[5%] h-12 w-12 text-orange-400" style={{ animation: 'shuffle-3 18s ease-in-out infinite alternate' }} />
          <Speaker className="absolute top-[70%] left-[15%] h-10 w-10 text-orange-400" style={{ animation: 'shuffle-1 20s ease-in-out infinite alternate' }} />
          <Keyboard className="absolute top-[65%] right-[5%] h-12 w-12 text-orange-400" style={{ animation: 'shuffle-2 15s ease-in-out infinite alternate' }} />
          <Mouse className="absolute bottom-[45%] left-[40%] h-8 w-8 text-orange-400" style={{ animation: 'shuffle-3 19s ease-in-out infinite alternate' }} />
          <Gamepad2 className="absolute top-[85%] right-[55%] h-11 w-11 text-orange-400" style={{ animation: 'shuffle-1 16s ease-in-out infinite alternate' }} />
          <Gift className="absolute top-[15%] left-[75%] h-9 w-9 text-orange-400" style={{ animation: 'shuffle-2 23s ease-in-out infinite alternate' }} />
        </div>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-16 pb-4 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
            Our Products
          </h2>
          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  );
}
