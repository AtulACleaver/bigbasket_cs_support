import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { ProfileSidebar } from '@/components/ProfileSidebar';
import { OrderHistory } from '@/components/OrderHistory';
import { RefundDialog } from '@/components/RefundDialog';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

type ViewMode = 'products' | 'orders';

export default function Index() {
  const { state, dispatch } = useApp();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('products');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(state.products.map(p => p.category))];
    return uniqueCategories.sort();
  }, [state.products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return state.products;
    }
    return state.products.filter(product => product.category === selectedCategory);
  }, [state.products, selectedCategory]);

  const handleCheckout = () => {
    if (state.cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = total > 500 ? 0 : 40;
    const finalTotal = total + deliveryFee;

    const newOrder = {
      id: `ORD${String(state.orders.length + 1).padStart(3, '0')}`,
      userId: state.user.id,
      items: [...state.cart],
      total: finalTotal,
      status: 'confirmed' as const,
      orderDate: new Date().toISOString().split('T')[0],
      refundStatus: 'none' as const
    };

    dispatch({ type: 'PLACE_ORDER', payload: newOrder });
    setCartOpen(false);
    toast.success('Order placed successfully!');
  };

  const handleRequestRefund = (orderId: string) => {
    setSelectedOrderId(orderId);
    setRefundDialogOpen(true);
  };

  const handleViewOrders = () => {
    setProfileOpen(false);
    setViewMode('orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => setCartOpen(true)}
        onProfileClick={() => setProfileOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        {viewMode === 'products' ? (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Fresh Groceries Delivered
              </h1>
              <p className="text-gray-600">
                Get fresh vegetables, fruits, and daily essentials delivered to your doorstep
              </p>
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <ProductGrid products={filteredProducts} />
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('products')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shopping
              </Button>
              <h1 className="text-2xl font-bold">Order History</h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderHistory onRequestRefund={handleRequestRefund} />
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <ProfileSidebar
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onViewOrders={handleViewOrders}
      />

      <RefundDialog
        open={refundDialogOpen}
        onClose={() => setRefundDialogOpen(false)}
        orderId={selectedOrderId}
      />
    </div>
  );
}