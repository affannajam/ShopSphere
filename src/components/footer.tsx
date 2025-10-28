import { ShoppingBag } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0 ml-4">
          <ShoppingBag className="h-6 w-6 text-accent" />
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
