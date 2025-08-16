import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

export function RefundPageLink() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to="/refund">
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full p-4 h-auto"
          size="lg"
        >
          <Smartphone className="w-6 h-6 mr-2" />
          View Refund Page
        </Button>
      </Link>
    </div>
  );
}