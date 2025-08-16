import { useState } from 'react';
import { Wallet, Building2, Zap, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function RefundPage() {
  const [refundMethod, setRefundMethod] = useState<'wallet' | 'bank'>('wallet');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleConfirmRefund = async () => {
    if (refundMethod === 'bank') {
      if (!bankDetails.accountNumber) {
        toast.error('Please enter your UPI ID');
        return;
      }
    }

    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      if (refundMethod === 'wallet') {
        toast.success('₹245 refunded to your wallet instantly! 🎉');
      } else {
        toast.success('Refund request submitted! Bank transfer will take 1-2 business days.');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Container */}
      <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="p-1">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Choose Your Refund Method
            </h1>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Refund Amount Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Refund Amount</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">₹245</p>
            <p className="text-sm text-gray-500">For missing item</p>
          </div>

          {/* Refund Method Options */}
          <div className="space-y-4">
            {/* BigBasket Wallet - Recommended */}
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                refundMethod === 'wallet' 
                  ? 'ring-2 ring-green-500 bg-green-50 border-green-200 shadow-md' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
              }`}
              onClick={() => setRefundMethod('wallet')}
            >
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {refundMethod === 'wallet' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Wallet className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-lg text-gray-900">BigBasket Wallet</span>
                      <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 font-medium">
                        Recommended
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Zap className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium text-gray-700">Instant refund</span>
                    </div>
                    <p className="text-sm text-gray-600">Use immediately on your next order</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cashback Banner for Wallet */}
            {refundMethod === 'wallet' && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white text-center animate-in slide-in-from-top-2 duration-300">
                <p className="text-sm font-semibold">🎉 +2% Cashback if you choose Wallet</p>
                <p className="text-xs opacity-90 mt-1">Extra ₹4.9 cashback on this refund!</p>
              </div>
            )}

            {/* Bank/UPI Refund */}
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                refundMethod === 'bank' 
                  ? 'ring-2 ring-green-500 bg-green-50 border-green-200 shadow-md' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
              }`}
              onClick={() => setRefundMethod('bank')}
            >
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {refundMethod === 'bank' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <span className="font-semibold text-lg text-gray-900">Bank/UPI Refund</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Refund to account in 1–2 business days</p>
                    <p className="text-sm text-gray-500">UPI ID: harsha@upi</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* UPI ID Input */}
            {refundMethod === 'bank' && (
              <div className="space-y-3 p-5 bg-gray-50 rounded-xl border animate-in slide-in-from-bottom-3 duration-300">
                <h4 className="font-medium text-gray-900 text-sm">Enter Your UPI ID</h4>
                <div className="space-y-2">
                  <Label htmlFor="upiId" className="text-sm font-medium text-gray-700">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="example@paytm"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value, ifscCode: 'UPI', accountHolderName: 'UPI User' }))}
                    className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 text-lg"
                  />
                  <p className="text-xs text-gray-500">Enter your UPI ID (e.g., username@paytm, username@googlepay)</p>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <div className="pt-4">
            <Button 
              onClick={handleConfirmRefund}
              disabled={loading}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Confirm Refund Method'
              )}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              Need help? Contact our support team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}