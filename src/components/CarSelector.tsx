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
  { name: 'Toyota', models: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Highlander', 'Prius', 'Yaris', 'Avalon', 'C-HR', 'Fortuner', 'Venza', 'Sienna', 'Tacoma', 'Tundra', '4Runner', 'Supra', 'GR86'] },
  { name: 'BMW', models: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'iX'] },
  { name: 'Mercedes-Benz', models: ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'EQC', 'EQS', 'EQB'] },
  { name: 'Audi', models: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'e-tron', 'e-tron GT'] },
  { name: 'Volkswagen', models: ['Polo', 'Golf', 'Jetta', 'Passat', 'Arteon', 'Tiguan', 'Touareg', 'Atlas', 'Taos', 'ID.3', 'ID.4', 'ID.Buzz'] },
  { name: 'Ford', models: ['Fiesta', 'Focus', 'Fusion', 'Mondeo', 'Mustang', 'Explorer', 'Expedition', 'Escape', 'Edge', 'Bronco', 'Ranger', 'F-150', 'Transit'] },
  { name: 'Chevrolet', models: ['Spark', 'Aveo', 'Cruze', 'Malibu', 'Camaro', 'Corvette', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Blazer', 'Silverado', 'Colorado'] },
  { name: 'Honda', models: ['Fit', 'Civic', 'Accord', 'Insight', 'CR-V', 'HR-V', 'Pilot', 'Passport', 'Ridgeline', 'Odyssey'] },
  { name: 'Nissan', models: ['Micra', 'Sentra', 'Altima', 'Maxima', 'Leaf', 'Ariya', 'Juke', 'Qashqai', 'X-Trail', 'Murano', 'Pathfinder', 'Armada', 'Frontier', 'Titan', 'GT-R', '370Z'] },
  { name: 'Mazda', models: ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-30', 'CX-5', 'CX-50', 'CX-9', 'CX-90', 'MX-5', 'MX-30'] },
  { name: 'Hyundai', models: ['i10', 'i20', 'i30', 'Elantra', 'Sonata', 'Ioniq', 'Kona', 'Tucson', 'Santa Fe', 'Palisade', 'Nexo', 'Ioniq 5', 'Ioniq 6'] },
  { name: 'Kia', models: ['Picanto', 'Rio', 'Cerato', 'Forte', 'Optima', 'Stinger', 'Soul', 'Seltos', 'Sportage', 'Sorento', 'Telluride', 'EV6', 'Niro'] },
  { name: 'Lexus', models: ['IS', 'ES', 'GS', 'LS', 'RC', 'LC', 'UX', 'NX', 'RX', 'GX', 'LX'] },
  { name: 'Volvo', models: ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90', 'C40', 'EX30', 'EX90'] },
  { name: 'Subaru', models: ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'Ascent', 'WRX', 'BRZ', 'Solterra'] },
  { name: 'Mitsubishi', models: ['Mirage', 'Lancer', 'Eclipse Cross', 'Outlander', 'Pajero', 'L200', 'ASX'] },
  { name: 'Peugeot', models: ['108', '208', '308', '508', '2008', '3008', '5008', 'Rifter', 'Traveller', 'e-208', 'e-2008'] },
  { name: 'Renault', models: ['Clio', 'Megane', 'Talisman', 'Captur', 'Kadjar', 'Koleos', 'Arkana', 'Duster', 'Zoe', 'Twingo'] },
  { name: 'Skoda', models: ['Fabia', 'Scala', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq'] },
  { name: 'Opel', models: ['Corsa', 'Astra', 'Insignia', 'Crossland', 'Grandland', 'Mokka', 'Combo'] },
  { name: 'Lada', models: ['Granta', 'Vesta', 'Largus', 'Niva', 'Niva Travel', 'Niva Legend'] },
  { name: 'Chery', models: ['Tiggo 2', 'Tiggo 4', 'Tiggo 7', 'Tiggo 8', 'Arrizo 5', 'Arrizo 6', 'Exeed TXL', 'Exeed VX'] },
  { name: 'Geely', models: ['Coolray', 'Atlas', 'Tugella', 'Monjaro', 'Emgrand', 'GC6', 'MK'] },
  { name: 'Haval', models: ['Jolion', 'F7', 'H6', 'H9', 'Dargo', 'M6'] },
  { name: 'Porsche', models: ['911', '718', 'Panamera', 'Cayenne', 'Macan', 'Taycan'] },
  { name: 'Land Rover', models: ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar'] },
  { name: 'Jaguar', models: ['XE', 'XF', 'XJ', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace'] },
  { name: 'Jeep', models: ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator', 'Wagoneer'] },
  { name: 'Infiniti', models: ['Q30', 'Q50', 'Q60', 'QX30', 'QX50', 'QX55', 'QX60', 'QX80'] },
  { name: 'Acura', models: ['ILX', 'TLX', 'RLX', 'RDX', 'MDX', 'NSX'] },
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