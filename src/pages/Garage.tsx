import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { SmartCarSearch } from '@/components/SmartCarSearch';
import { VinSearch } from '@/components/VinSearch';
import { getCarImage } from '@/utils/carImages';
import { allParts, getPartsByCar } from '@/data/partsDatabase';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  engine?: string;
  generation?: string;
  restyling?: string;
  vin?: string;
  image: string;
  isDefault: boolean;
}

const mockCars: Car[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2018,
    engine: '2.5L 181 л.с.',
    generation: 'XV70',
    restyling: '2017-2020',
    vin: 'JTNB11HK8J3012345',
    image: getCarImage('Toyota', 'Camry'),
    isDefault: true
  },
  {
    id: 2,
    brand: 'BMW',
    model: 'X5',
    year: 2020,
    engine: '3.0L 340 л.с.',
    generation: 'G05',
    vin: 'WBAJW1C52LWX12345',
    image: getCarImage('BMW', 'X5'),
    isDefault: false
  }
];

const brands = ['Toyota', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Honda', 'Nissan', 'Mazda', 'Hyundai', 'Kia'];
const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

const Garage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: '',
    engine: '',
    vin: ''
  });

  const handleAddCar = () => {
    if (!newCar.brand || !newCar.model || !newCar.year || !newCar.engine) {
      return;
    }

    const car: Car = {
      id: Date.now(),
      brand: newCar.brand,
      model: newCar.model,
      year: parseInt(newCar.year),
      engine: newCar.engine,
      vin: newCar.vin,
      image: '/placeholder.svg',
      isDefault: cars.length === 0
    };

    setCars([...cars, car]);
    setNewCar({ brand: '', model: '', year: '', engine: '', vin: '' });
    setIsAddDialogOpen(false);
  };

  const setDefaultCar = (id: number) => {
    setCars(cars.map(car => ({
      ...car,
      isDefault: car.id === id
    })));
  };

  const removeCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const searchPartsByCar = (car: Car) => {
    navigate('/', { state: { searchCar: car } });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#1a1f2e] border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-white hover:text-primary">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад к каталогу
            </Button>
            <h1 className="text-xl font-bold">Мой гараж</h1>
            <div className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Мои автомобили</h2>
            <p className="text-muted-foreground">Сохраните свои авто для быстрого подбора запчастей</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить автомобиль
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>Добавить автомобиль</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="brand">Марка *</Label>
                  <Select value={newCar.brand} onValueChange={(val) => setNewCar({ ...newCar, brand: val })}>
                    <SelectTrigger className="bg-secondary border-input">
                      <SelectValue placeholder="Выберите марку" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="model">Модель *</Label>
                  <Input
                    id="model"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                    placeholder="Например: Camry"
                    className="bg-secondary border-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Год *</Label>
                    <Select value={newCar.year} onValueChange={(val) => setNewCar({ ...newCar, year: val })}>
                      <SelectTrigger className="bg-secondary border-input">
                        <SelectValue placeholder="Год" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="engine">Двигатель *</Label>
                    <Input
                      id="engine"
                      value={newCar.engine}
                      onChange={(e) => setNewCar({ ...newCar, engine: e.target.value })}
                      placeholder="2.5L"
                      className="bg-secondary border-input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="vin">VIN код (опционально)</Label>
                  <Input
                    id="vin"
                    value={newCar.vin}
                    onChange={(e) => setNewCar({ ...newCar, vin: e.target.value.toUpperCase() })}
                    placeholder="17 символов"
                    maxLength={17}
                    className="bg-secondary border-input"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Для точного подбора запчастей
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddCar} className="bg-primary hover:bg-primary/90">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {cars.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-16 text-center">
              <Icon name="Car" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Гараж пустой</h3>
              <p className="text-muted-foreground mb-6">
                Добавьте свой автомобиль для быстрого подбора запчастей
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить первый автомобиль
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Card key={car.id} className="bg-card border-border hover-scale">
                {car.isDefault && (
                  <Badge className="absolute top-4 right-4 z-10 bg-primary">
                    По умолчанию
                  </Badge>
                )}

                <CardHeader className="p-0">
                  <div className="aspect-video bg-secondary flex items-center justify-center rounded-t-lg overflow-hidden">
                    <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">
                    {car.brand} {car.model}
                  </CardTitle>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>{car.year} год</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Gauge" size={16} />
                      <span>Двигатель: {car.engine}</span>
                    </div>
                    {car.vin && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Hash" size={16} />
                        <span className="text-xs font-mono">{car.vin}</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex flex-col gap-2">
                  <Button
                    onClick={() => searchPartsByCar(car)}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Icon name="Search" size={16} className="mr-2" />
                    Подобрать запчасти
                  </Button>

                  <div className="flex gap-2 w-full">
                    {!car.isDefault && (
                      <Button
                        variant="outline"
                        onClick={() => setDefaultCar(car.id)}
                        className="flex-1"
                        size="sm"
                      >
                        <Icon name="Star" size={14} className="mr-1" />
                        По умолчанию
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => removeCar(car.id)}
                      className="flex-1 hover:text-red-500 hover:border-red-500"
                      size="sm"
                    >
                      <Icon name="Trash2" size={14} className="mr-1" />
                      Удалить
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <Icon name="Zap" size={32} className="text-primary mb-3" />
              <h3 className="font-semibold mb-2">Быстрый подбор</h3>
              <p className="text-sm text-muted-foreground">
                Подбирайте запчасти для своих автомобилей в один клик
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <Icon name="History" size={32} className="text-primary mb-3" />
              <h3 className="font-semibold mb-2">История покупок</h3>
              <p className="text-sm text-muted-foreground">
                Храните историю всех покупок для каждого авто
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <Icon name="Bell" size={32} className="text-primary mb-3" />
              <h3 className="font-semibold mb-2">Напоминания</h3>
              <p className="text-sm text-muted-foreground">
                Получайте уведомления о плановом ТО и замене деталей
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Garage;