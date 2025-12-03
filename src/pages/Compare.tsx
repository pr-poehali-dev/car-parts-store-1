import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface CompareProduct {
  id: number;
  name: string;
  brand: string;
  article: string;
  price: number;
  rating: number;
  image: string;
  warranty: string;
  weight: string;
  country: string;
  inStock: boolean;
  delivery: string;
}

const mockProducts: CompareProduct[] = [
  {
    id: 1,
    name: 'Моторное масло Castrol EDGE 5W-30',
    brand: 'Castrol',
    article: '156EA9',
    price: 3250,
    rating: 4.8,
    image: '/placeholder.svg',
    warranty: '1 год',
    weight: '4 л',
    country: 'Германия',
    inStock: true,
    delivery: '1-2 дня'
  },
  {
    id: 2,
    name: 'Моторное масло Mobil 1 ESP 5W-30',
    brand: 'Mobil',
    article: '153626',
    price: 3890,
    rating: 4.9,
    image: '/placeholder.svg',
    warranty: '1 год',
    weight: '4 л',
    country: 'США',
    inStock: true,
    delivery: '1-2 дня'
  },
  {
    id: 3,
    name: 'Моторное масло Shell Helix Ultra 5W-30',
    brand: 'Shell',
    article: '550046377',
    price: 3590,
    rating: 4.7,
    image: '/placeholder.svg',
    warranty: '1 год',
    weight: '4 л',
    country: 'Нидерланды',
    inStock: false,
    delivery: '3-5 дней'
  }
];

const Compare = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<CompareProduct[]>(mockProducts);
  const [showDifferences, setShowDifferences] = useState(false);

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const characteristics = [
    { label: 'Цена', key: 'price', format: (val: any) => `${val} ₽` },
    { label: 'Рейтинг', key: 'rating', format: (val: any) => `★ ${val}` },
    { label: 'Производитель', key: 'brand' },
    { label: 'Артикул', key: 'article' },
    { label: 'Объём', key: 'weight' },
    { label: 'Страна', key: 'country' },
    { label: 'Гарантия', key: 'warranty' },
    { label: 'Наличие', key: 'inStock', format: (val: boolean) => val ? 'В наличии' : 'Под заказ' },
    { label: 'Доставка', key: 'delivery' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#1a1f2e] border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-white hover:text-primary">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад к каталогу
            </Button>
            <h1 className="text-xl font-bold">Сравнение товаров</h1>
            <div className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="ArrowLeftRight" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Нет товаров для сравнения</h2>
            <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
            <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Перейти в каталог
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Сравнение ({products.length})</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDifferences(!showDifferences)}
                >
                  <Icon name={showDifferences ? 'Eye' : 'EyeOff'} size={16} className="mr-2" />
                  {showDifferences ? 'Показать всё' : 'Только различия'}
                </Button>
              </div>
              <Button variant="outline" onClick={() => setProducts([])}>
                <Icon name="Trash2" size={16} className="mr-2" />
                Очистить всё
              </Button>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, 280px)` }}>
                  <div className="sticky left-0 bg-background z-10" />
                  
                  {products.map((product) => (
                    <Card key={product.id} className="bg-card border-border p-4">
                      <div className="flex justify-end mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                          className="hover:text-red-500"
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                      
                      <div className="aspect-square bg-secondary rounded mb-4 flex items-center justify-center">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
                      </div>

                      <h3 className="font-semibold text-sm mb-2 line-clamp-3">{product.name}</h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-muted-foreground">★ {product.rating}</span>
                        <Badge variant="outline">{product.brand}</Badge>
                      </div>

                      <p className="text-2xl font-bold text-primary mb-4">{product.price} ₽</p>

                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </Card>
                  ))}

                  <div className="col-span-full my-4 border-t border-border" />

                  {characteristics.map((char) => {
                    const values = products.map(p => (p as any)[char.key]);
                    const hasGifferences = new Set(values.map(v => JSON.stringify(v))).size > 1;
                    
                    if (showDifferences && !hasGifferences) return null;

                    return (
                      <>
                        <div className="sticky left-0 bg-background z-10 py-3 font-medium flex items-center">
                          {char.label}
                          {hasGifferences && (
                            <Icon name="AlertCircle" size={14} className="ml-2 text-primary" />
                          )}
                        </div>
                        {products.map((product) => {
                          const value = (product as any)[char.key];
                          const displayValue = char.format ? char.format(value) : value;
                          return (
                            <div
                              key={`${product.id}-${char.key}`}
                              className={`py-3 px-4 bg-card rounded ${hasGifferences ? 'border-l-2 border-primary' : ''}`}
                            >
                              {typeof value === 'boolean' ? (
                                <Badge variant={value ? 'default' : 'secondary'} className={value ? 'bg-green-500' : ''}>
                                  {displayValue}
                                </Badge>
                              ) : (
                                <span className="text-sm">{displayValue}</span>
                              )}
                            </div>
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Лучший выбор</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Icon name="TrendingDown" size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Лучшая цена</p>
                    <p className="text-sm text-muted-foreground">
                      {products.reduce((min, p) => p.price < min.price ? p : min).name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Star" size={24} className="text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Лучший рейтинг</p>
                    <p className="text-sm text-muted-foreground">
                      {products.reduce((max, p) => p.rating > max.rating ? p : max).name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Truck" size={24} className="text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Быстрая доставка</p>
                    <p className="text-sm text-muted-foreground">
                      {products.filter(p => p.inStock)[0]?.name || 'Нет в наличии'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Compare;