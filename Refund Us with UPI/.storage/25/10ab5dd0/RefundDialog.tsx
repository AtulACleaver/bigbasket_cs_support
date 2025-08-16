import { useState } from 'react';
import { Wallet, Building2, Zap, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Order, RefundRequest } from '@/types';
import { toast } from 'sonner';

interface RefundDialogProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

export function RefundDialog({ open, onClose, orderId }: RefundDialogProps) {
  const { state, dispatch } = useApp();
  const [refundMethod, setRefundMethod] = useState<'wallet' | 'bank'>('wallet');
  const [reason, setReason] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [loading, setLoading] = useState(false);

  const order = state.orders.find(o => o.id === orderId);
  
  if (!order) return null;

  const handleSubmitRefund = async () => {
    if (!reason.trim()) {
      toast.error('Please provide a reason for refund');
      return;
    }

    if (refundMethod === 'bank') {
      if (!bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountHolderName) {
        toast.error('Please fill all bank details');
        return;
      }
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const refundRequest: RefundRequest = {
        orderId,
        amount: order.total,
        method: refundMethod,
        reason,
        bankDetails: refundMethod === 'bank' ? bankDetails : undefined
      };

      // Update order with refund status
      dispatch({
        type: 'UPDATE_ORDER_REFUND',
        payload: {
          orderId,
          refundStatus: 'requested',
          refundAmount: order.total,
          refundMethod: refundMethod
        }
      });

      // If wallet refund, simulate immediate processing
      if (refundMethod === 'wallet') {
        setTimeout(() => {
          dispatch({
            type: 'UPDATE_ORDER_REFUND',
            payload: {
              orderId,
              refundStatus: 'completed',
              refundAmount: order.total,
              refundMethod: refundMethod
            }
          });
          dispatch({ type: 'UPDATE_WALLET', payload: order.total });
          toast.success(`₹${order.total} refunded to your wallet!`);
        }, 2000);
      } else {
        toast.success('Refund request submitted! Bank transfer will take 3-5 business days.');
      }

      setLoading(false);
      onClose();
      setReason('');
      setBankDetails({ accountNumber: '', ifscCode: '', accountHolderName: '' });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 text-center">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Choose Your Refund Method
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-6 space-y-6">
          {/* Refund Amount Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Refund Amount</p>
            <p className="text-3xl font-bold text-gray-900">₹{order.total}</p>
            <p className="text-sm text-gray-500 mt-1">For missing item</p>
          </div>

          {/* Refund Method Options */}
          <div className="space-y-3">
            {/* BigBasket Wallet - Recommended */}
            <Card 
              className={`cursor-pointer transition-all ${
                refundMethod === 'wallet' 
                  ? 'ring-2 ring-green-500 bg-green-50 border-green-200' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setRefundMethod('wallet')}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {refundMethod === 'wallet' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Wallet className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900">BigBasket Wallet</span>
                      <Badge className="bg-green-100 text-green-800 text-xs px-2 py-0.5">
                        Recommended
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">Instant refund</span>
                    </div>
                    <p className="text-xs text-gray-500">Use immediately on your next order</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cashback Banner for Wallet */}
            {refundMethod === 'wallet' && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 text-white text-center">
                <p className="text-sm font-medium">🎉 +2% Cashback if you choose Wallet</p>
              </div>
            )}

            {/* Bank/UPI Refund */}
            <Card 
              className={`cursor-pointer transition-all ${
                refundMethod === 'bank' 
                  ? 'ring-2 ring-green-500 bg-green-50 border-green-200' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setRefundMethod('bank')}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {refundMethod === 'bank' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Bank/UPI Refund</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Refund to account in 1–2 business days</p>
                    <p className="text-xs text-gray-500">UPI ID: harsha@upi</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details Form */}
            {refundMethod === 'bank' && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="text-sm font-medium">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode" className="text-sm font-medium">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    placeholder="Enter IFSC code"
                    value={bankDetails.ifscCode}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, ifscCode: e.target.value }))}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountHolderName" className="text-sm font-medium">Account Holder Name</Label>
                  <Input
                    id="accountHolderName"
                    placeholder="Enter account holder name"
                    value={bankDetails.accountHolderName}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                    className="h-10"
                  />
                </div>
              </div>
            )}

            {/* Reason for Refund */}
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-medium">Reason for Refund</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for the refund..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          {/* Confirm Button */}
          <Button 
            onClick={handleSubmitRefund} 
            disabled={loading} 
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-base rounded-xl"
          >
            {loading ? 'Processing...' : 'Confirm Refund Method'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}