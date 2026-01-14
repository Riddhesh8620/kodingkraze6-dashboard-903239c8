import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, ShoppingCart, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/dashboard/Header";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    removeFromCart, 
    clearCart, 
    totalPrice, 
    originalTotalPrice,
    bundleDiscount,
    itemCount 
  } = useCart();

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-display mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Browse our courses and add topics or full courses to your cart.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/dashboard">Browse Courses</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold font-display">
                Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </h1>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Clear All
              </Button>
            </div>

            {/* Bundle Discount Banner */}
            {bundleDiscount > 0 && (
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-400">
                    Bundle Discount Applied!
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    You're saving {formatPrice(bundleDiscount)} with 3+ items
                  </p>
                </div>
              </div>
            )}

            {items.length < 3 && (
              <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Add {3 - items.length} more item{3 - items.length > 1 ? 's' : ''} to get 10% bundle discount!
                </p>
              </div>
            )}

            {items.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-xl border border-border bg-card flex gap-4"
              >
                <img 
                  src={item.image} 
                  alt={item.courseTitle}
                  className="w-24 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {item.type === "topic" ? "Topic" : "Full Course"}
                      </Badge>
                      <h3 className="font-medium line-clamp-1">
                        {item.topicTitle || item.courseTitle}
                      </h3>
                      {item.type === "topic" && (
                        <p className="text-sm text-muted-foreground">
                          From: {item.courseTitle}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold">{formatPrice(item.price)}</p>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive hover:text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-6 rounded-2xl border border-border bg-card shadow-elevated">
              <h2 className="text-lg font-bold font-display mb-6">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(originalTotalPrice)}</span>
                </div>
                
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Bundle Discount (10%)</span>
                    <span>-{formatPrice(bundleDiscount)}</span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-border flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Button 
                className="w-full btn-accent text-lg py-6 mt-6"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure payment via QR code
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
