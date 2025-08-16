import { User, Package, Wallet, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';

interface ProfileSidebarProps {
  open: boolean;
  onClose: () => void;
  onViewOrders: () => void;
}

export function ProfileSidebar({ open, onClose, onViewOrders }: ProfileSidebarProps) {
  const { state } = useApp();
  const { user } = state;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[350px]">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wallet className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium">Wallet Balance</p>
                  <p className="text-sm text-gray-600">Available funds</p>
                </div>
              </div>
              <p className="font-bold text-xl text-green-600">₹{user.walletBalance.toFixed(2)}</p>
            </div>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onViewOrders}
            >
              <Package className="w-5 h-5 mr-3" />
              My Orders
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <User className="w-5 h-5 mr-3" />
              Edit Profile
            </Button>
            
            <Separator />
            
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}