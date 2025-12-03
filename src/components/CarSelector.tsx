import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface CarSelectorProps {
  onCarSelect?: (car: { brand: string; model: string; year: string }) => void;
  onSchemeClick?: () => void;
}

const brands = [
  { name: 'Toyota', models: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser'] },
  { name: 'BMW', models: ['3 Series', '5 Series', 'X5', 'X3'] },
  { name: 'Mercedes', models: ['C-Class', 'E-Class', 'GLC', 'GLE'] },
  { name: 'Audi', models: ['A4', 'A6', 'Q5', 'Q7'] },
  { name: 'Volkswagen', models: ['Polo', 'Passat', 'Tiguan', 'Touareg'] },
];

const years = Array.from({ length: 25 }, (_, i) => (new Date().getFullYear() - i).toString());

export const CarSelector = ({ onCarSelect, onSchemeClick }: CarSelectorProps) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [savedCar, setSavedCar] = useState<{ brand: string; model: string; year: string } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentModels = brands.find(b => b.name === selectedBrand)?.models || [];

  const handleSelect = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      const car = { brand: selectedBrand, model: selectedModel, year: selectedYear };
      setSavedCar(car);
      onCarSelect?.(car);
      setIsExpanded(false);
    }
  };

  const handleClear = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setSavedCar(null);
  };

  if (!isExpanded && !savedCar) {
    return (
      <Card 
        className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 cursor-pointer hover:border-primary/40 transition-all"
        onClick={() => setIsExpanded(true)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Car" size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold">Выберите свой автомобиль</p>
                <p className="text-xs text-muted-foreground">Для точного подбора запчастей</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} className="text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (savedCar) {
    return (
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Car" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">
                  {savedCar.brand} {savedCar.model}
                </p>
                <Badge variant="outline" className="mt-1">{savedCar.year} год</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onSchemeClick}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Icon name="Scan" size={16} className="mr-1" />
                Схема
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card to-secondary border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={20} className="text-primary" />
            <p className="font-semibold">Выбор автомобиля</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Марка</label>
              <Select value={selectedBrand} onValueChange={(val) => {
                setSelectedBrand(val);
                setSelectedModel('');
              }}>
                <SelectTrigger className="bg-secondary border-input h-9 text-sm">
                  <SelectValue placeholder="Марка" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.name} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Модель</label>
              <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedBrand}>
                <SelectTrigger className="bg-secondary border-input h-9 text-sm">
                  <SelectValue placeholder="Модель" />
                </SelectTrigger>
                <SelectContent>
                  {currentModels.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Год</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-secondary border-input h-9 text-sm">
                  <SelectValue placeholder="Год" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSelect}
            disabled={!selectedBrand || !selectedModel || !selectedYear}
            className="w-full bg-primary hover:bg-primary/90 h-9"
            size="sm"
          >
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Применить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};