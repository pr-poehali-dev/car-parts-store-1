import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  article: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export const CartModal = ({ open, onOpenChange, items, onUpdateQuantity, onRemoveItem }: CartModalProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={24} className="text-primary" />
            Корзина ({itemsCount})
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Корзина пустая</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-secondary rounded-lg">
                  <div className="w-20 h-20 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <Badge variant="outline" className="mt-1 text-xs">{item.brand}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="hover:text-red-500 flex-shrink-0"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">Артикул: {item.article}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>

                      <p className="text-lg font-bold text-primary">{item.price * item.quantity} ₽</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DialogFooter className="flex-col sm:flex-col gap-4">
            <div className="flex justify-between items-center w-full text-lg font-bold">
              <span>Итого:</span>
              <span className="text-primary text-2xl">{total} ₽</span>
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Продолжить покупки
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Icon name="CreditCard" size={18} className="mr-2" />
                Оформить заказ
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};