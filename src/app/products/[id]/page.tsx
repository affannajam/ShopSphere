




import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/star-rating';
import { ShoppingCart, Headphones, Shirt, BookOpen, Laptop, Smartphone, Watch, Camera, Gem, Speaker, Keyboard, Mouse, Gamepad2, Gift } from 'lucide-react';
import { getProductRecommendations } from '@/ai/flows/ai-shopping-assistant';
import { ProductCard } from '@/components/product-card';
import { AddToCartButton } from './add-to-cart-button';


async function RecommendedProducts({ currentProductId }: { currentProductId: string }) {
  // Mock user history for demonstration
  const userPurchaseHistory = ['prod2'];
  const userBrowsingHistory = ['prod5', 'prod7'];

  try {
    const recommendations = await getProductRecommendations({
      currentProductId,
      userPurchaseHistory,
      userBrowsingHistory,
    });

    const recommendedProducts = products.filter(p => recommendations.recommendedProductIds.includes(p.id) && p.id !== currentProductId);

    if (recommendedProducts.length === 0) {
      // Fallback: show some other products if AI returns none or only the current one
      const fallbackProducts = products.filter(p => p.id !== currentProductId).slice(0, 3);
      if (fallbackProducts.length === 0) return null;

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fallbackProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to get product recommendations:", error);
    // Render a fallback or nothing on error
    const fallbackProducts = products.filter(p => p.id !== currentProductId).slice(0, 3);
    if (fallbackProducts.length === 0) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fallbackProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <section className="relative bg-[#211026] py-16 sm:py-24 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-10 opacity-10">
          <Headphones className="absolute top-[5%] left-[15%] h-12 w-12 text-orange-400" style={{ animation: 'shuffle-1 15s ease-in-out infinite alternate' }} />
          <Shirt className="absolute top-[10%] right-[15%] h-10 w-10 text-orange-400" style={{ animation: 'shuffle-2 18s ease-in-out infinite alternate' }} />
          <BookOpen className="absolute bottom-[5%] left-[25%] h-8 w-8 text-orange-400" style={{ animation: 'shuffle-3 20s ease-in-out infinite alternate' }} />
          <ShoppingCart className="absolute bottom-[10%] right-[10%] h-14 w-14 text-orange-400" style={{ animation: 'shuffle-1 16s ease-in-out infinite alternate' }} />
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
        <div className="relative z-20 container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="relative aspect-square w-full h-auto max-w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                    />
                </div>
                <div className="space-y-6">
                    <h1 className="text-4xl font-headline font-bold">{product.name}</h1>
                    <div className="flex items-center gap-4">
                        <StarRating rating={product.rating} />
                        <span className="text-muted-foreground">{product.rating} / 5</span>
                    </div>
                    <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
                    <div className="text-lg text-muted-foreground">
                        {product.description}
                    </div>
                    <div className="flex items-center gap-4">
                        <AddToCartButton product={product} />
                    </div>
                    <div className={`text-sm ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </div>
                </div>
            </div>
            <div className="mt-24">
                <h2 className="text-3xl font-headline font-bold mb-8">You Might Also Like</h2>
                <RecommendedProducts currentProductId={product.id} />
            </div>
        </div>
    </section>
  );
}
