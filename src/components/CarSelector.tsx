import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface CarSelectorProps {
  onCarSelect?: (car: { brand: string; model: string; year: string }) => void;
}

const brands = [
  { name: 'Toyota', models: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser'] },
  { name: 'BMW', models: ['3 Series', '5 Series', 'X5', 'X3'] },
  { name: 'Mercedes', models: ['C-Class', 'E-Class', 'GLC', 'GLE'] },
  { name: 'Audi', models: ['A4', 'A6', 'Q5', 'Q7'] },
  { name: 'Volkswagen', models: ['Polo', 'Passat', 'Tiguan', 'Touareg'] },
];

const years = Array.from({ length: 25 }, (_, i) => (new Date().getFullYear() - i).toString());

export const CarSelector = ({ onCarSelect }: CarSelectorProps) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [savedCar, setSavedCar] = useState<{ brand: string; model: string; year: string } | null>(null);

  const currentModels = brands.find(b => b.name === selectedBrand)?.models || [];

  const handleSelect = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      const car = { brand: selectedBrand, model: selectedModel, year: selectedYear };
      setSavedCar(car);
      onCarSelect?.(car);
    }
  };

  const handleClear = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setSavedCar(null);
  };

  return (
    <Card className="bg-gradient-to-br from-card to-secondary border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Car" size={24} className="text-primary" />
          Выбор автомобиля
        </CardTitle>
      </CardHeader>
      <CardContent>
        {savedCar ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Выбранный автомобиль</p>
                <p className="text-xl font-bold">
                  {savedCar.brand} {savedCar.model}
                </p>
                <Badge variant="outline" className="mt-2">{savedCar.year} год</Badge>
              </div>
              <Button variant="ghost" onClick={handleClear} className="hover:text-primary">
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="CheckCircle" size={16} className="text-green-500" />
              <span>Теперь выберите запчасть на схеме ниже</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Марка</label>
                <Select value={selectedBrand} onValueChange={(val) => {
                  setSelectedBrand(val);
                  setSelectedModel('');
                }}>
                  <SelectTrigger className="bg-secondary border-input">
                    <SelectValue placeholder="Выберите марку" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.name} value={brand.name}>
                        <div className="flex items-center gap-2">
                          <Icon name="Car" size={16} />
                          {brand.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Модель</label>
                <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedBrand}>
                  <SelectTrigger className="bg-secondary border-input">
                    <SelectValue placeholder="Выберите модель" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentModels.map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Год</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-secondary border-input">
                    <SelectValue placeholder="Год выпуска" />
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
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Icon name="CheckCircle" size={18} className="mr-2" />
              Применить выбор
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};