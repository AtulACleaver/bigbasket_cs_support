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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Refund</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Order #{orderId}</p>
            <p className="font-semibold">Refund Amount: ₹{order.total}</p>
          </div>

          <div className="space-y-4">
            <Label>Refund Method</Label>
            <RadioGroup value={refundMethod} onValueChange={(value: 'wallet' | 'bank') => setRefundMethod(value)}>
              <Card className={`cursor-pointer ${refundMethod === 'wallet' ? 'ring-2 ring-green-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-5 h-5 text-green-600" />
                      <div>
                        <Label htmlFor="wallet" className="cursor-pointer font-medium">BigBasket Wallet</Label>
                        <p className="text-sm text-gray-600">Instant refund • Current balance: ₹{state.user.walletBalance.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer ${refundMethod === 'bank' ? 'ring-2 ring-green-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="bank" id="bank" />
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <Label htmlFor="bank" className="cursor-pointer font-medium">Bank Account</Label>
                        <p className="text-sm text-gray-600">3-5 business days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>

            {refundMethod === 'bank' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    placeholder="Enter IFSC code"
                    value={bankDetails.ifscCode}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, ifscCode: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountHolderName">Account Holder Name</Label>
                  <Input
                    id="accountHolderName"
                    placeholder="Enter account holder name"
                    value={bankDetails.accountHolderName}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Refund</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for the refund..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmitRefund} disabled={loading} className="flex-1">
              {loading ? 'Processing...' : 'Submit Refund'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}