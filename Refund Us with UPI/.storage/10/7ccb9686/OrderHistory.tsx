import { Package, Calendar, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

interface OrderHistoryProps {
  onRequestRefund: (orderId: string) => void;
}

export function OrderHistory({ onRequestRefund }: OrderHistoryProps) {
  const { state } = useApp();
  const { orders } = state;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'approved':
        return 'bg-blue-500';
      case 'requested':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Ordered: {new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  {order.deliveryDate && (
                    <span>Delivered: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge className={getStatusColor(order.status)}>
                  {order.status.toUpperCase()}
                </Badge>
                {order.refundStatus && order.refundStatus !== 'none' && (
                  <Badge className={getRefundStatusColor(order.refundStatus)}>
                    Refund {order.refundStatus.toUpperCase()}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                    </div>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-lg">Total: ₹{order.total}</span>
                  {order.refundAmount && (
                    <span className="text-sm text-green-600">
                      Refunded: ₹{order.refundAmount} to {order.refundMethod}
                    </span>
                  )}
                </div>
                
                {order.status === 'delivered' && (!order.refundStatus || order.refundStatus === 'none') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRequestRefund(order.id)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Request Refund
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}