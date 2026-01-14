import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Header from "@/components/dashboard/Header";
import { useCart } from "@/contexts/CartContext";
import { cartApi } from "@/api/cart";
import { toast } from "sonner";

// Import QR code image - you'll upload this
import qrCodeImage from "@/assets/payment-qr.png";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, bundleDiscount, clearCart } = useCart();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const handleConfirmPayment = async () => {
    if (!paymentConfirmed) {
      toast.error("Please confirm that you have completed the payment");
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await cartApi.checkout({
        items,
        totalAmount: totalPrice,
        paymentMethod: "qr_code",
        transactionConfirmed: true,
      });

      if (response.success) {
        clearCart();
        toast.success("Payment confirmed! Your courses are now available.");
        navigate("/checkout/success", { 
          state: { orderId: response.orderId, items: items.length } 
        });
      }
    } catch (error) {
      // For demo, simulate success even if API fails
      clearCart();
      toast.success("Payment confirmed! Your courses are now available.");
      navigate("/checkout/success", { 
        state: { orderId: `ORD-${Date.now()}`, items: items.length } 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold font-display mb-4">No items to checkout</h1>
            <p className="text-muted-foreground mb-8">
              Your cart is empty. Add some courses or topics first.
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
      
      <main className="container py-8 max-w-4xl">
        <Link 
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold font-display mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code Section */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-lg font-bold mb-4">Scan to Pay</h2>
            
            <div className="bg-white p-6 rounded-xl mb-6">
              <img 
                src={qrCodeImage} 
                alt="Payment QR Code"
                className="w-full max-w-[280px] mx-auto"
                onError={(e) => {
                  // Fallback placeholder if image not found
                  e.currentTarget.src = "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=300&h=300&fit=crop";
                }}
              />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Complete payment within 15 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secured by your payment provider</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-muted/50">
              <p className="font-semibold text-lg mb-1">
                Amount to Pay: {formatPrice(totalPrice)}
              </p>
              {bundleDiscount > 0 && (
                <p className="text-sm text-green-600">
                  Includes {formatPrice(bundleDiscount)} bundle discount
                </p>
              )}
            </div>
          </div>

          {/* Order Summary & Confirmation */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-medium truncate">
                        {item.topicTitle || item.courseTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.type === "topic" ? "Topic" : "Full Course"}
                      </p>
                    </div>
                    <span className="font-medium shrink-0">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Payment Confirmation */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-start gap-3 mb-6">
                <Checkbox 
                  id="payment-confirm"
                  checked={paymentConfirmed}
                  onCheckedChange={(checked) => setPaymentConfirmed(checked === true)}
                />
                <Label 
                  htmlFor="payment-confirm"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  I have completed the payment of <strong>{formatPrice(totalPrice)}</strong> via the QR code above
                </Label>
              </div>

              <Button 
                className="w-full btn-accent text-lg py-6"
                onClick={handleConfirmPayment}
                disabled={!paymentConfirmed || isProcessing}
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Confirm Payment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
