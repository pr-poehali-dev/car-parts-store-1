import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { allParts } from '@/data/partsDatabase';

const PartsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const part = allParts.find(p => p.id === id);

  if (!part) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="PackageX" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Запчасть не найдена</h2>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 mt-4">
            <Icon name="Home" size={16} className="mr-2" />
            На главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#1a1f2e] border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-white hover:text-primary">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к каталогу
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-secondary rounded-lg p-8 mb-4">
              <img src={part.image} alt={part.name} className="w-full h-auto object-contain rounded" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">{part.brand}</Badge>
              {part.isOriginal && (
                <Badge className="bg-green-500 hover:bg-green-600">Оригинал</Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-4">{part.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl font-bold text-primary">{part.price} ₽</div>
              <Badge variant="secondary" className="text-sm">В наличии</Badge>
            </div>

            <Card className="bg-card border-border mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Артикул</p>
                    <p className="font-mono font-semibold">{part.article}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Производитель</p>
                    <p className="font-semibold">{part.brand}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Категория</p>
                    <p className="font-semibold capitalize">{part.subcategory}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Гарантия</p>
                    <p className="font-semibold">1 год</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="h-12 w-12"
                >
                  <Icon name="Minus" size={18} />
                </Button>
                <div className="w-16 text-center font-semibold">{selectedQuantity}</div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="h-12 w-12"
                >
                  <Icon name="Plus" size={18} />
                </Button>
              </div>

              <Button className="flex-1 bg-primary hover:bg-primary/90 h-12">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>

            <Tabs defaultValue="cross" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cross">Кросс-номера</TabsTrigger>
                <TabsTrigger value="compatibility">Совместимость</TabsTrigger>
              </TabsList>

              <TabsContent value="cross" className="mt-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    {part.crossNumbers && part.crossNumbers.length > 0 ? (
                      <>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="ArrowLeftRight" size={18} className="text-primary" />
                          Аналоги и кросс-номера
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Эти запчасти взаимозаменяемы с оригинальной деталью
                        </p>
                        <div className="space-y-2">
                          {part.crossNumbers.map((cross, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                              <div>
                                <p className="font-mono font-semibold">{cross}</p>
                                <p className="text-xs text-muted-foreground">Аналог</p>
                              </div>
                              <Button variant="outline" size="sm">
                                <Icon name="Search" size={14} className="mr-1" />
                                Найти
                              </Button>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Icon name="AlertCircle" size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Кросс-номера не найдены</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compatibility" className="mt-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    {part.compatibleCars && part.compatibleCars.length > 0 ? (
                      <>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="Car" size={18} className="text-primary" />
                          Подходит для автомобилей
                        </h3>
                        <div className="space-y-2">
                          {part.compatibleCars.map((car, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                              <Icon name="CheckCircle" size={18} className="text-green-500" />
                              <span className="font-medium">{car}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Icon name="AlertCircle" size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Список совместимых автомобилей уточняйте у менеджера</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Рекомендуемые товары</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {allParts.filter(p => p.category === part.category && p.id !== part.id).slice(0, 4).map((relatedPart) => (
              <Card key={relatedPart.id} className="bg-card border-border hover-scale cursor-pointer" onClick={() => navigate(`/parts/${relatedPart.id}`)}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-secondary rounded mb-3 overflow-hidden">
                    <img src={relatedPart.image} alt={relatedPart.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-semibold line-clamp-2 mb-2">{relatedPart.name}</p>
                  <p className="text-lg font-bold text-primary">{relatedPart.price} ₽</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsDetail;