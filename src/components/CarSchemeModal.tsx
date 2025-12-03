import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CarPartsTree } from './CarPartsTree';

interface CarPart {
  id: string;
  name: string;
  categories: string[];
  icon: string;
  position: { top: string; left: string };
  description: string;
}

const carParts: CarPart[] = [
  {
    id: 'engine',
    name: 'Двигатель',
    categories: ['Масла', 'Фильтры', 'Свечи зажигания', 'Ремни'],
    icon: 'Cog',
    position: { top: '45%', left: '28%' },
    description: 'Моторные масла, фильтры, система охлаждения'
  },
  {
    id: 'brakes',
    name: 'Тормозная система',
    categories: ['Тормозные колодки', 'Диски', 'Жидкости'],
    icon: 'Disc',
    position: { top: '75%', left: '20%' },
    description: 'Колодки, диски, тормозные жидкости'
  },
  {
    id: 'suspension',
    name: 'Подвеска',
    categories: ['Амортизаторы', 'Пружины', 'Рычаги'],
    icon: 'Gauge',
    position: { top: '65%', left: '45%' },
    description: 'Амортизаторы, стойки, рычаги'
  },
  {
    id: 'electrical',
    name: 'Электрика',
    categories: ['Аккумуляторы', 'Лампы', 'Датчики'],
    icon: 'Zap',
    position: { top: '35%', left: '15%' },
    description: 'Аккумуляторы, лампы, проводка'
  },
  {
    id: 'transmission',
    name: 'Трансмиссия',
    categories: ['Сцепление', 'КПП', 'Приводы'],
    icon: 'Settings',
    position: { top: '58%', left: '35%' },
    description: 'Сцепление, масла для КПП'
  },
  {
    id: 'body',
    name: 'Кузов',
    categories: ['Фары', 'Зеркала', 'Бамперы'],
    icon: 'Box',
    position: { top: '30%', left: '70%' },
    description: 'Фары, зеркала, молдинги'
  },
  {
    id: 'cooling',
    name: 'Охлаждение',
    categories: ['Радиатор', 'Помпа', 'Термостат'],
    icon: 'Snowflake',
    position: { top: '40%', left: '20%' },
    description: 'Система охлаждения двигателя'
  },
  {
    id: 'exhaust',
    name: 'Выхлоп',
    categories: ['Глушители', 'Катализаторы', 'Трубы'],
    icon: 'Wind',
    position: { top: '70%', left: '60%' },
    description: 'Выхлопная система'
  },
  {
    id: 'steering',
    name: 'Рулевое',
    categories: ['Рейка', 'Насос ГУР', 'Наконечники'],
    icon: 'Disc3',
    position: { top: '50%', left: '15%' },
    description: 'Рулевое управление'
  },
  {
    id: 'fuel',
    name: 'Топливо',
    categories: ['Насос', 'Фильтр', 'Форсунки'],
    icon: 'Fuel',
    position: { top: '55%', left: '65%' },
    description: 'Топливная система'
  },
  {
    id: 'interior',
    name: 'Салон',
    categories: ['Сиденья', 'Панель', 'Обшивка'],
    icon: 'Armchair',
    position: { top: '35%', left: '50%' },
    description: 'Детали салона'
  },
  {
    id: 'electronics',
    name: 'Электроника',
    categories: ['ЭБУ', 'Датчики', 'Проводка'],
    icon: 'Cpu',
    position: { top: '25%', left: '40%' },
    description: 'Электронные системы'
  },
];

interface CarSchemeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  carInfo?: { brand: string; model: string; year: string };
  onPartSelect?: (categories: string[]) => void;
}

export const CarSchemeModal = ({ open, onOpenChange, carInfo, onPartSelect }: CarSchemeModalProps) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handlePartClick = (part: CarPart) => {
    setSelectedPart(part.id);
    onPartSelect?.(part.categories);
  };

  const handleCategorySelect = (path: string[]) => {
    onPartSelect?.(path);
    onOpenChange(false);
  };

  const currentPart = carParts.find(p => p.id === selectedPart);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Scan" size={24} className="text-primary" />
            Подбор запчастей
            {carInfo && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                {carInfo.brand} {carInfo.model} ({carInfo.year})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="catalog">
              <Icon name="List" size={16} className="mr-2" />
              Каталог по категориям
            </TabsTrigger>
            <TabsTrigger value="scheme">
              <Icon name="Car" size={16} className="mr-2" />
              Визуальная схема
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="mt-4">
            <CarPartsTree onCategorySelect={handleCategorySelect} />
          </TabsContent>

          <TabsContent value="scheme" className="mt-4">
            <div className="relative bg-gradient-to-b from-secondary to-background rounded-lg p-6 overflow-hidden">
              <div className="relative w-full max-w-4xl mx-auto" style={{ aspectRatio: '16/9' }}>
                <svg
                  viewBox="0 0 800 450"
                  className="w-full h-full"
                >
                  <defs>
                    <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#2d3748', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#1a202c', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 150 200 L 200 180 L 280 170 L 400 165 L 500 170 L 580 180 L 650 200 L 680 220 L 680 280 L 650 300 L 150 300 L 120 280 L 120 220 Z"
                    fill="url(#carGradient)"
                    stroke="#ff6b35"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  <ellipse cx="230" cy="300" rx="35" ry="35" fill="#1a202c" stroke="#ff6b35" strokeWidth="2" />
                  <ellipse cx="570" cy="300" rx="35" ry="35" fill="#1a202c" stroke="#ff6b35" strokeWidth="2" />

                  <path
                    d="M 280 180 L 320 175 L 350 185 L 350 230 L 280 230 Z"
                    fill="#1a202c"
                    stroke="#ff6b35"
                    strokeWidth="1"
                    opacity="0.6"
                  />

                  <path
                    d="M 370 175 L 480 175 L 510 185 L 510 230 L 370 230 Z"
                    fill="#1a202c"
                    stroke="#ff6b35"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                </svg>

                {carParts.map((part) => {
                  const isSelected = selectedPart === part.id;
                  const isHovered = hoveredPart === part.id;
                  
                  return (
                    <button
                      key={part.id}
                      onClick={() => handlePartClick(part)}
                      onMouseEnter={() => setHoveredPart(part.id)}
                      onMouseLeave={() => setHoveredPart(null)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 cursor-pointer"
                      style={{
                        top: part.position.top,
                        left: part.position.left,
                      }}
                    >
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                          isSelected
                            ? 'bg-primary border-primary scale-125 shadow-lg shadow-primary/50'
                            : isHovered
                            ? 'bg-primary/20 border-primary scale-110'
                            : 'bg-secondary border-border hover:border-primary'
                        }`}
                      >
                        <Icon
                          name={part.icon as any}
                          size={18}
                          className={isSelected || isHovered ? 'text-primary' : 'text-muted-foreground'}
                        />
                        
                        {(isHovered || isSelected) && (
                          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap z-20">
                            <p className="text-xs font-semibold">{part.name}</p>
                            <p className="text-xs text-muted-foreground">{part.description}</p>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedPart && currentPart && (
                <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name={currentPart.icon as any} size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{currentPart.name}</h4>
                        <p className="text-sm text-muted-foreground">{currentPart.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedPart(null)}>
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {currentPart.categories.map((category) => (
                      <Badge key={category} variant="outline" className="border-primary text-primary">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => {
                      onPartSelect?.(currentPart.categories);
                      onOpenChange(false);
                    }}
                  >
                    <Icon name="Search" size={16} className="mr-2" />
                    Показать запчасти
                  </Button>
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {carParts.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => handlePartClick(part)}
                    className={`p-2 rounded-lg border transition-all text-left ${
                      selectedPart === part.id
                        ? 'bg-primary/10 border-primary'
                        : 'bg-secondary border-border hover:border-primary'
                    }`}
                  >
                    <Icon name={part.icon as any} size={16} className={selectedPart === part.id ? 'text-primary' : 'text-muted-foreground'} />
                    <p className="text-xs font-medium mt-1">{part.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};