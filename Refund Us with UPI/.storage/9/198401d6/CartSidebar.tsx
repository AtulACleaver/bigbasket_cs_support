import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ open, onClose, onCheckout }: CartSidebarProps) {
  const { state, dispatch } = useApp();
  const { cart } = state;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      toast.success('Item removed from cart');
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">Your cart is empty</p>
            <p className="text-sm text-gray-400 text-center mt-2">Add some products to get started!</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({cart.length} items)</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-600">{item.unit}</p>
                <p className="font-bold">₹{item.price}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 0)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            {subtotal > 0 && subtotal < 500 && (
              <p className="text-sm text-green-600">Add ₹{500 - subtotal} more for free delivery!</p>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          
          <Button className="w-full" size="lg" onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}