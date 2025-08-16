import { ShoppingCart, User, Search, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

interface HeaderProps {
  onCartClick: () => void;
  onProfileClick: () => void;
}

export function Header({ onCartClick, onProfileClick }: HeaderProps) {
  const { state } = useApp();
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">BigBasket</h1>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for products..."
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-700 px-3 py-1 rounded-full">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">₹{state.user.walletBalance.toFixed(2)}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-green-700"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-green-700"
              onClick={onProfileClick}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}