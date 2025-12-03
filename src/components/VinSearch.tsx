import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { decodeVIN, type VinDecodeResult } from '@/data/vinDatabase';

interface VinSearchProps {
  onVinDecode?: (result: VinDecodeResult) => void;
}

export const VinSearch = ({ onVinDecode }: VinSearchProps) => {
  const [vin, setVin] = useState('');
  const [result, setResult] = useState<VinDecodeResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDecode = async () => {
    setError('');
    setResult(null);

    if (vin.length !== 17) {
      setError('VIN код должен содержать 17 символов');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const decoded = decodeVIN(vin.toUpperCase());
      
      if (!decoded) {
        setError('Не удалось распознать VIN код. Проверьте правильность ввода.');
        setIsLoading(false);
        return;
      }

      setResult(decoded);
      setIsLoading(false);
      onVinDecode?.(decoded);
    }, 1000);
  };

  const handleClear = () => {
    setVin('');
    setResult(null);
    setError('');
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Scan" size={20} className="text-primary" />
          Поиск по VIN-коду
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Введите 17 символов VIN-кода"
              value={vin}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
                if (value.length <= 17) {
                  setVin(value);
                  setError('');
                }
              }}
              maxLength={17}
              className="bg-secondary border-input font-mono text-lg"
            />
            {vin && (
              <Button variant="ghost" onClick={handleClear}>
                <Icon name="X" size={18} />
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between text-xs">
            <p className="text-muted-foreground">
              {vin.length}/17 символов
            </p>
            {vin.length > 0 && vin.length < 17 && (
              <p className="text-yellow-500">Осталось {17 - vin.length} символов</p>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
            <Icon name="AlertCircle" size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <Button
          onClick={handleDecode}
          disabled={vin.length !== 17 || isLoading}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
              Распознаём VIN...
            </>
          ) : (
            <>
              <Icon name="Search" size={18} className="mr-2" />
              Распознать автомобиль
            </>
          )}
        </Button>

        {result && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
              <img src={result.image} alt={`${result.brand} ${result.model}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Icon name="CheckCircle" size={12} className="mr-1" />
                    VIN распознан
                  </Badge>
                </div>
                <p className="text-white font-bold text-xl">{result.brand} {result.model}</p>
                <p className="text-white/80">{result.year} год</p>
              </div>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Icon name="Info" size={18} className="text-primary" />
                Информация об автомобиле
              </h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Марка</p>
                  <p className="font-semibold">{result.brand}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Модель</p>
                  <p className="font-semibold">{result.model}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Год выпуска</p>
                  <p className="font-semibold">{result.year}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Поколение</p>
                  <p className="font-semibold">{result.generation}</p>
                </div>
                {result.restyling && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground mb-1">Рестайлинг</p>
                    <p className="font-semibold">{result.restyling}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-muted-foreground mb-1">Двигатель</p>
                  <p className="font-semibold">{result.engineVolume} ({result.engine})</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Трансмиссия</p>
                  <p className="font-semibold">{result.transmission}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Тип кузова</p>
                  <p className="font-semibold">{result.bodyType}</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              <Icon name="Search" size={18} className="mr-2" />
              Подобрать запчасти для этого авто
            </Button>
          </div>
        )}

        <div className="p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
            <Icon name="Info" size={14} />
            Где найти VIN-код?
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 ml-5">
            <li>• Под лобовым стеклом со стороны водителя</li>
            <li>• В дверном проёме водительской двери</li>
            <li>• В техпаспорте автомобиля</li>
            <li>• Под капотом на шильдике</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};