import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { CartModal } from '@/components/CartModal';
import { CarSelector } from '@/components/CarSelector';
import { CarSchemeModal } from '@/components/CarSchemeModal';
import { SmartCarSearch } from '@/components/SmartCarSearch';
import { VinSearch } from '@/components/VinSearch';
import { allParts, fluids, getPartsByCar } from '@/data/partsDatabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Product {
  id: number;
  name: string;
  brand: string;
  article: string;
  price: number;
  rating: number;
  reviews: number;
  discount?: number;
  image: string;
  warranty: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  ...allParts.slice(0, 10).map((part, idx) => ({
    id: idx + 1,
    name: part.name,
    brand: part.brand,
    article: part.article,
    price: part.price,
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 300) + 50,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : undefined,
    image: part.image,
    warranty: part.isOriginal
  })),
  ...fluids.slice(0, 6).map((fluid, idx) => ({
    id: idx + 100,
    name: fluid.name,
    brand: fluid.brand,
    article: fluid.article,
    price: fluid.price,
    rating: 4.6 + Math.random() * 0.4,
    reviews: Math.floor(Math.random() * 200) + 30,
    discount: Math.random() > 0.8 ? Math.floor(Math.random() * 15) + 5 : undefined,
    image: fluid.image,
    warranty: true
  }))
];

const categories = [
  { name: 'Все товары', icon: 'Package' },
  { name: 'Запчасти', icon: 'Wrench' },
  { name: 'Масла', icon: 'Droplet' },
  { name: 'Жидкости', icon: 'Droplets' },
  { name: 'Фильтры', icon: 'Filter' },
  { name: 'Электрика', icon: 'Zap' },
  { name: 'Аксессуары', icon: 'ShoppingBag' }
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('Все товары');
  const [searchType, setSearchType] = useState<'general' | 'article' | 'vin'>('general');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<{ brand: string; model: string; year: string } | null>(null);
  const [selectedCarPart, setSelectedCarPart] = useState<string[] | null>(null);
  const [isSchemeOpen, setIsSchemeOpen] = useState(false);
  const [isSmartSearchOpen, setIsSmartSearchOpen] = useState(false);
  const [isVinSearchOpen, setIsVinSearchOpen] = useState(false);

  const toggleCompare = (productId: number) => {
    setCompareList(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#1a1f2e] border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Icon name="Car" size={32} className="text-primary" />
              <div>
                <h1 className="text-xl font-bold text-white">АвтоМаркет</h1>
                <p className="text-xs text-muted-foreground">Запчасти и аксессуары</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" className="text-white hover:text-primary" onClick={() => navigate('/garage')}>
                <Icon name="Warehouse" size={18} className="mr-2" />
                Гараж
              </Button>
              <Button variant="ghost" className="text-white hover:text-primary">О нас</Button>
              <Button variant="ghost" className="text-white hover:text-primary">Доставка</Button>
              <Button variant="ghost" className="text-white hover:text-primary">Контакты</Button>
            </nav>

            <Button className="bg-primary hover:bg-primary/90 relative" onClick={() => setIsCartOpen(true)}>
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Корзина
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Button>
          </div>

          <div className="pb-4">
            <Tabs value={searchType} onValueChange={(v) => setSearchType(v as any)} className="w-full">
              <TabsList className="bg-secondary w-full md:w-auto">
                <TabsTrigger value="general" className="flex-1 md:flex-none">
                  <Icon name="Search" size={16} className="mr-2" />
                  Общий поиск
                </TabsTrigger>
                <TabsTrigger value="article" className="flex-1 md:flex-none">
                  <Icon name="Hash" size={16} className="mr-2" />
                  По артикулу
                </TabsTrigger>
                <TabsTrigger value="vin" className="flex-1 md:flex-none">
                  <Icon name="Scan" size={16} className="mr-2" />
                  По VIN коду
                </TabsTrigger>
              </TabsList>

              <div className="mt-3">
                <div className="flex gap-2">
                  {searchType === 'vin' ? (
                    <Button 
                      onClick={() => setIsVinSearchOpen(true)}
                      className="flex-1 bg-primary hover:bg-primary/90 justify-start"
                    >
                      <Icon name="Scan" size={18} className="mr-2" />
                      Открыть поиск по VIN-коду
                    </Button>
                  ) : searchType === 'general' ? (
                    <>
                      <Input
                        placeholder="Поиск по названию, бренду, артикулу..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-secondary border-input text-white"
                      />
                      <Button className="bg-primary hover:bg-primary/90">
                        <Icon name="Search" size={18} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        placeholder="Введите артикул производителя..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-secondary border-input text-white font-mono"
                      />
                      <Button className="bg-primary hover:bg-primary/90">
                        <Icon name="Search" size={18} />
                      </Button>
                    </>
                  )}
                </div>
                {searchType === 'general' && (
                  <Button
                    variant="ghost"
                    onClick={() => setIsSmartSearchOpen(true)}
                    className="w-full mt-2 text-primary hover:text-primary hover:bg-primary/10"
                    size="sm"
                  >
                    <Icon name="Sparkles" size={16} className="mr-2" />
                    Расширенный поиск с характеристиками двигателя
                  </Button>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <CarSelector 
            onCarSelect={(car) => setSelectedCar(car)}
            onSchemeClick={() => setIsSchemeOpen(true)}
          />
        </div>

        {selectedCarPart && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Подбор для: {selectedCar?.brand} {selectedCar?.model}</p>
                <p className="font-semibold">Категории: {selectedCarPart.join(', ')}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCarPart(null)}>
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span>Оригинальные артикулы</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span>Интерактивные схемы</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span>Подбор аналогов</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat.name}
              variant={activeCategory === cat.name ? 'default' : 'secondary'}
              className={activeCategory === cat.name ? 'bg-primary hover:bg-primary/90' : ''}
              onClick={() => setActiveCategory(cat.name)}
            >
              <Icon name={cat.icon as any} size={16} className="mr-2" />
              {cat.name}
            </Button>
          ))}
        </div>

        {compareList.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="ArrowLeftRight" size={20} className="text-primary" />
              <span className="font-medium">Выбрано для сравнения: {compareList.length}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCompareList([])}>
                Очистить
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/compare')}>
                Сравнить
              </Button>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Все товары</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="bg-card border-border hover-scale overflow-hidden">
              {product.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 z-10">
                  -{product.discount}%
                </Badge>
              )}
              
              <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                <Checkbox
                  checked={compareList.includes(product.id)}
                  onCheckedChange={() => toggleCompare(product.id)}
                  className="bg-white border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </div>

              <CardHeader className="p-0">
                <div className="aspect-square bg-secondary flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                  <span className="text-xs text-muted-foreground">★ {product.rating} ({product.reviews})</span>
                </div>
                
                <CardTitle className="text-sm mb-2 line-clamp-2">{product.name}</CardTitle>
                
                <p className="text-xs text-muted-foreground mb-3">Артикул: {product.article}</p>

                {product.warranty && (
                  <div className="flex items-center gap-1 text-xs text-primary mb-3">
                    <Icon name="Shield" size={14} />
                    <span>1 год гарантии</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-primary">{product.price} ₽</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => addToCart(product)}>
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <footer className="bg-[#1a1f2e] border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">О компании</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">О нас</a></li>
                <li><a href="#" className="hover:text-primary">Контакты</a></li>
                <li><a href="#" className="hover:text-primary">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Покупателям</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Доставка</a></li>
                <li><a href="#" className="hover:text-primary">Оплата</a></li>
                <li><a href="#" className="hover:text-primary">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Каталог</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Запчасти</a></li>
                <li><a href="#" className="hover:text-primary">Масла</a></li>
                <li><a href="#" className="hover:text-primary">Аксессуары</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  <span>+7 (800) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <span>info@automarket.ru</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2024 АвтоМаркет. Все права защищены.
          </div>
        </div>
      </footer>

      <CartModal
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />

      <CarSchemeModal
        open={isSchemeOpen}
        onOpenChange={setIsSchemeOpen}
        carInfo={selectedCar || undefined}
        onPartSelect={(categories) => {
          setSelectedCarPart(categories);
          setIsSchemeOpen(false);
        }}
      />

      <Dialog open={isSmartSearchOpen} onOpenChange={setIsSmartSearchOpen}>
        <DialogContent className="max-w-4xl bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Умный подбор автомобиля</DialogTitle>
          </DialogHeader>
          <SmartCarSearch
            onCarSelect={(carDetails) => {
              setSelectedCar({
                brand: carDetails.brand,
                model: carDetails.model,
                year: carDetails.year
              });
              setIsSmartSearchOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isVinSearchOpen} onOpenChange={setIsVinSearchOpen}>
        <DialogContent className="max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Поиск по VIN-коду</DialogTitle>
          </DialogHeader>
          <VinSearch
            onVinDecode={(result) => {
              setSelectedCar({
                brand: result.brand,
                model: result.model,
                year: result.year.toString()
              });
              setTimeout(() => setIsVinSearchOpen(false), 2000);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;