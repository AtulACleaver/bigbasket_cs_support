import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { dispatch } = useApp();

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              {product.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  {product.discount}% OFF
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-md flex items-center justify-center">
                  <span className="text-white font-semibold">Out of Stock</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-600">{product.unit}</p>
              
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{product.rating} ({product.reviews})</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              
              <Button
                className="w-full"
                size="sm"
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}