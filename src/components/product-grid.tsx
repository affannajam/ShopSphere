"use client";

import { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function ProductGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [rating, setRating] = useState(0);

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === 'all' || product.category === category;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const ratingMatch = product.rating >= rating;
      return categoryMatch && priceMatch && ratingMatch;
    });
  }, [products, category, priceRange, rating]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters */}
      <aside className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <Label>Price Range</Label>
              <p className="text-sm text-muted-foreground">${priceRange[0]} - ${priceRange[1]}</p>
              <Slider
                min={0}
                max={400}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                className="w-full"
              />
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star === rating ? 0 : star)} aria-label={`Set minimum rating to ${star}`}>
                    <Star
                      className={`h-6 w-6 cursor-pointer transition-colors ${
                        star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Product List */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              No products match the current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
