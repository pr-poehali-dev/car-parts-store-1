import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { carGenerations, type CarGeneration, type EngineOption } from '@/data/vinDatabase';
import { getCarImage } from '@/utils/carImages';

interface SmartCarSearchProps {
  onCarSelect?: (carDetails: {
    brand: string;
    model: string;
    year: string;
    generation?: string;
    restyling?: string;
    engine?: string;
    image: string;
  }) => void;
}

const brands = Object.keys(carGenerations);

export const SmartCarSearch = ({ onCarSelect }: SmartCarSearchProps) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<CarGeneration | null>(null);
  const [selectedRestyling, setSelectedRestyling] = useState('');
  const [selectedEngine, setSelectedEngine] = useState<EngineOption | null>(null);

  const models = selectedBrand ? Object.keys(carGenerations[selectedBrand] || {}) : [];
  const generations = selectedBrand && selectedModel ? carGenerations[selectedBrand][selectedModel] : [];
  
  const availableGenerations = generations.filter(gen => {
    if (!selectedYear) return true;
    const [start, end] = gen.years.split('-').map(y => parseInt(y));
    const year = parseInt(selectedYear);
    return year >= start && year <= end;
  });

  const handleGenerationSelect = (genCode: string) => {
    const gen = availableGenerations.find(g => g.code === genCode);
    setSelectedGeneration(gen || null);
    setSelectedRestyling('');
    setSelectedEngine(null);
  };

  const handleApply = () => {
    if (!selectedBrand || !selectedModel || !selectedYear) return;

    const carImage = getCarImage(selectedBrand, selectedModel);

    onCarSelect?.({
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      generation: selectedGeneration?.code,
      restyling: selectedRestyling,
      engine: selectedEngine ? `${selectedEngine.volume} ${selectedEngine.power}` : undefined,
      image: carImage
    });
  };

  const handleReset = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setSelectedGeneration(null);
    setSelectedRestyling('');
    setSelectedEngine(null);
  };

  const carImage = selectedBrand && selectedModel ? getCarImage(selectedBrand, selectedModel) : null;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Search" size={20} className="text-primary" />
          Умный подбор автомобиля
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Марка *</label>
            <Select value={selectedBrand} onValueChange={(val) => {
              setSelectedBrand(val);
              setSelectedModel('');
              setSelectedYear('');
              setSelectedGeneration(null);
              setSelectedRestyling('');
              setSelectedEngine(null);
            }}>
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
            <label className="text-sm text-muted-foreground mb-2 block">Модель *</label>
            <Select value={selectedModel} onValueChange={(val) => {
              setSelectedModel(val);
              setSelectedYear('');
              setSelectedGeneration(null);
              setSelectedRestyling('');
              setSelectedEngine(null);
            }} disabled={!selectedBrand}>
              <SelectTrigger className="bg-secondary border-input">
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Год выпуска *</label>
            <Input
              type="number"
              placeholder="2020"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedGeneration(null);
                setSelectedRestyling('');
                setSelectedEngine(null);
              }}
              min="1990"
              max="2025"
              className="bg-secondary border-input"
              disabled={!selectedModel}
            />
          </div>
        </div>

        {carImage && (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
            <img src={carImage} alt={`${selectedBrand} ${selectedModel}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white font-semibold text-lg">{selectedBrand} {selectedModel}</p>
              {selectedYear && <p className="text-white/80 text-sm">{selectedYear} год</p>}
            </div>
          </div>
        )}

        {availableGenerations.length > 0 && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
              <Icon name="Calendar" size={14} />
              Поколение / Кузов
            </label>
            <div className="grid grid-cols-1 gap-2">
              {availableGenerations.map((gen) => (
                <button
                  key={gen.code}
                  onClick={() => handleGenerationSelect(gen.code)}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    selectedGeneration?.code === gen.code
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{gen.name}</p>
                      <p className="text-sm text-muted-foreground">{gen.years}</p>
                    </div>
                    {selectedGeneration?.code === gen.code && (
                      <Icon name="CheckCircle" size={20} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedGeneration?.restyling && selectedGeneration.restyling.length > 0 && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
              <Icon name="Sparkles" size={14} />
              Рестайлинг
            </label>
            <div className="grid grid-cols-2 gap-2">
              {selectedGeneration.restyling.map((restyle, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRestyling(restyle)}
                  className={`p-3 border rounded-lg transition-all ${
                    selectedRestyling === restyle
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <Badge variant={idx === 0 ? 'secondary' : 'outline'} className="mb-1">
                    {idx === 0 ? 'До рестайлинга' : 'После рестайлинга'}
                  </Badge>
                  <p className="text-sm font-medium">{restyle}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedGeneration?.engines && selectedGeneration.engines.length > 0 && (
          <div>
            <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
              <Icon name="Cog" size={14} />
              Двигатель
            </label>
            <div className="space-y-2">
              {selectedGeneration.engines.map((engine, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEngine(engine)}
                  className={`w-full p-3 border rounded-lg text-left transition-all ${
                    selectedEngine?.code === engine.code
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{engine.volume}</Badge>
                      <span className="font-semibold">{engine.power}</span>
                    </div>
                    {selectedEngine?.code === engine.code && (
                      <Icon name="CheckCircle" size={20} className="text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Fuel" size={14} />
                      <span>{engine.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Settings" size={14} />
                      <span>{engine.transmission.join(', ')}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleApply}
            disabled={!selectedBrand || !selectedModel || !selectedYear}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Icon name="CheckCircle" size={18} className="mr-2" />
            Применить
          </Button>
          {selectedBrand && (
            <Button variant="outline" onClick={handleReset}>
              <Icon name="RotateCcw" size={18} />
            </Button>
          )}
        </div>

        {selectedBrand && selectedModel && selectedGeneration && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm font-semibold mb-2">Выбранная конфигурация:</p>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Автомобиль:</span> {selectedBrand} {selectedModel} ({selectedYear})</p>
              <p><span className="text-muted-foreground">Поколение:</span> {selectedGeneration.code}</p>
              {selectedRestyling && <p><span className="text-muted-foreground">Рестайлинг:</span> {selectedRestyling}</p>}
              {selectedEngine && (
                <p><span className="text-muted-foreground">Двигатель:</span> {selectedEngine.volume} {selectedEngine.power} ({selectedEngine.fuel})</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};