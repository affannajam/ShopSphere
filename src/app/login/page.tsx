'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag, Headphones, Shirt, BookOpen, Laptop, Smartphone, Watch, Camera, Gem, Speaker, Keyboard, Mouse, Gamepad2, Gift } from 'lucide-react';
import { useAuth, useUser, initiateEmailSignIn } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/account');
    }
  }, [user, isUserLoading, router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please enter both email and password.',
      });
      return;
    }
    // We handle the promise here to catch errors
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        let description = 'An unexpected error occurred. Please try again.';
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
          description = 'Invalid email or password. Please check your credentials and try again.';
        } else if (errorCode === 'auth/invalid-email') {
          description = 'The email address is not valid. Please enter a valid email.';
        } else if (errorCode === 'auth/too-many-requests') {
            description = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
        }
        toast({
            variant: 'destructive',
            title: 'Authentication Failed',
            description: description,
        });
      });
  };

  return (
    <section className="relative bg-[#211026] py-16 sm:py-24 overflow-hidden px-4 sm:px-6 lg:px-8">
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
      <div className="relative z-20 flex items-center justify-center min-h-[calc(80vh-12rem)] container mx-auto px-4">
        <Card className="w-full max-w-sm animated-hero-gradient text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Login</CardTitle>
            <CardDescription className="text-white/80">
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleSignIn} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required className="bg-white/10 border-white/20 focus:bg-white/20" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required className="bg-white/10 border-white/20 focus:bg-white/20" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20">Sign in</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-white/80">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline text-white">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
