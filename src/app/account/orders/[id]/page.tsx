import { orders } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
       <Button asChild variant="outline" size="sm" className="mb-4">
         <Link href="/account/orders"><ArrowLeft className="mr-2 h-4 w-4" />Back to Orders</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Order {order.id}</span>
            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
              {order.status}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">Date: {order.date}</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <address className="not-italic text-muted-foreground">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </address>
              <h3 className="font-semibold mt-6 mb-2">Total</h3>
              <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
