import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PartNode {
  id: string;
  name: string;
  icon: string;
  children?: PartNode[];
}

const partsTree: PartNode[] = [
  {
    id: 'body',
    name: 'Кузов',
    icon: 'Box',
    children: [
      { id: 'body-panels', name: 'Панели кузова', icon: 'Layers' },
      { id: 'body-doors', name: 'Двери и крышки', icon: 'DoorOpen' },
      { id: 'body-glass', name: 'Остекление', icon: 'Square' },
      { id: 'body-bumpers', name: 'Бамперы и обвесы', icon: 'Shield' },
      { id: 'body-lights', name: 'Фары и фонари', icon: 'Lightbulb' },
      { id: 'body-mirrors', name: 'Зеркала', icon: 'Mirror' },
    ]
  },
  {
    id: 'engine',
    name: 'Двигатель',
    icon: 'Cog',
    children: [
      {
        id: 'engine-block',
        name: 'Блок цилиндров',
        icon: 'Box',
        children: [
          { id: 'engine-block-pistons', name: 'Поршни и кольца', icon: 'Circle' },
          { id: 'engine-block-liners', name: 'Гильзы цилиндров', icon: 'Cylinder' },
          { id: 'engine-block-crankshaft', name: 'Коленвал', icon: 'Settings' },
        ]
      },
      {
        id: 'engine-head',
        name: 'ГБЦ (головка блока)',
        icon: 'Crown',
        children: [
          { id: 'engine-head-valves', name: 'Клапаны', icon: 'Move' },
          { id: 'engine-head-camshaft', name: 'Распредвал', icon: 'Settings' },
          { id: 'engine-head-springs', name: 'Пружины клапанов', icon: 'Wind' },
        ]
      },
      { id: 'engine-mount', name: 'Крепление двигателя', icon: 'Anchor' },
      {
        id: 'engine-air',
        name: 'Система подачи воздуха',
        icon: 'Wind',
        children: [
          { id: 'engine-air-filter', name: 'Воздушный фильтр', icon: 'Filter' },
          { id: 'engine-air-intake', name: 'Впускной коллектор', icon: 'ArrowDown' },
          { id: 'engine-air-turbo', name: 'Турбина', icon: 'Fan' },
        ]
      },
      { id: 'engine-gaskets', name: 'Прокладки и сальники', icon: 'Minus' },
    ]
  },
  {
    id: 'fuel',
    name: 'Топливная система',
    icon: 'Fuel',
    children: [
      { id: 'fuel-tank', name: 'Топливный бак', icon: 'Droplet' },
      { id: 'fuel-pump', name: 'Топливный насос', icon: 'Droplets' },
      { id: 'fuel-filter', name: 'Топливный фильтр', icon: 'Filter' },
      { id: 'fuel-injectors', name: 'Форсунки', icon: 'Pipette' },
      { id: 'fuel-rail', name: 'Топливная рампа', icon: 'Minus' },
    ]
  },
  {
    id: 'cooling',
    name: 'Система охлаждения',
    icon: 'Snowflake',
    children: [
      { id: 'cooling-radiator', name: 'Радиатор', icon: 'Grid' },
      { id: 'cooling-pump', name: 'Помпа', icon: 'Fan' },
      { id: 'cooling-thermostat', name: 'Термостат', icon: 'Thermometer' },
      { id: 'cooling-fan', name: 'Вентилятор', icon: 'Fan' },
      { id: 'cooling-hoses', name: 'Патрубки', icon: 'Pipette' },
    ]
  },
  {
    id: 'exhaust',
    name: 'Система выпуска',
    icon: 'Wind',
    children: [
      { id: 'exhaust-manifold', name: 'Выпускной коллектор', icon: 'ArrowUp' },
      { id: 'exhaust-catalyst', name: 'Катализатор', icon: 'Filter' },
      { id: 'exhaust-muffler', name: 'Глушитель', icon: 'Volume2' },
      { id: 'exhaust-pipes', name: 'Трубы', icon: 'Minus' },
    ]
  },
  {
    id: 'transmission',
    name: 'Трансмиссия',
    icon: 'Settings',
    children: [
      { id: 'transmission-clutch', name: 'Сцепление', icon: 'Circle' },
      { id: 'transmission-gearbox', name: 'КПП', icon: 'Box' },
      { id: 'transmission-drive', name: 'Приводы', icon: 'Minus' },
      { id: 'transmission-diff', name: 'Дифференциал', icon: 'Cog' },
    ]
  },
  {
    id: 'suspension',
    name: 'Ходовая часть',
    icon: 'Gauge',
    children: [
      { id: 'suspension-shocks', name: 'Амортизаторы', icon: 'Move' },
      { id: 'suspension-springs', name: 'Пружины', icon: 'Wind' },
      { id: 'suspension-arms', name: 'Рычаги', icon: 'GitBranch' },
      { id: 'suspension-bushings', name: 'Сайлентблоки', icon: 'Circle' },
      { id: 'suspension-stabilizer', name: 'Стабилизатор', icon: 'Minus' },
    ]
  },
  {
    id: 'steering',
    name: 'Рулевое управление',
    icon: 'Disc3',
    children: [
      { id: 'steering-wheel', name: 'Рулевое колесо', icon: 'Circle' },
      { id: 'steering-rack', name: 'Рулевая рейка', icon: 'Minus' },
      { id: 'steering-pump', name: 'Насос ГУР', icon: 'Droplets' },
      { id: 'steering-tips', name: 'Рулевые наконечники', icon: 'Move' },
    ]
  },
  {
    id: 'brakes',
    name: 'Тормозная система',
    icon: 'Disc',
    children: [
      { id: 'brakes-pads', name: 'Тормозные колодки', icon: 'Square' },
      { id: 'brakes-discs', name: 'Тормозные диски', icon: 'Disc' },
      { id: 'brakes-calipers', name: 'Суппорты', icon: 'Box' },
      { id: 'brakes-master', name: 'Главный цилиндр', icon: 'Cylinder' },
      { id: 'brakes-fluid', name: 'Тормозная жидкость', icon: 'Droplet' },
    ]
  },
  {
    id: 'electronics',
    name: 'Электроника',
    icon: 'Zap',
    children: [
      { id: 'electronics-battery', name: 'Аккумулятор', icon: 'Battery' },
      { id: 'electronics-starter', name: 'Стартер', icon: 'Power' },
      { id: 'electronics-generator', name: 'Генератор', icon: 'Zap' },
      { id: 'electronics-sensors', name: 'Датчики', icon: 'Gauge' },
      { id: 'electronics-ecu', name: 'ЭБУ', icon: 'Cpu' },
    ]
  },
  {
    id: 'interior',
    name: 'Детали салона',
    icon: 'Armchair',
    children: [
      { id: 'interior-seats', name: 'Сиденья', icon: 'Armchair' },
      { id: 'interior-dashboard', name: 'Панель приборов', icon: 'LayoutDashboard' },
      { id: 'interior-trim', name: 'Обшивка', icon: 'Layers' },
      { id: 'interior-carpet', name: 'Ковры', icon: 'Square' },
      { id: 'interior-climate', name: 'Климат-контроль', icon: 'Snowflake' },
    ]
  },
  {
    id: 'accessories',
    name: 'Доп. оборудование',
    icon: 'Plus',
    children: [
      { id: 'accessories-audio', name: 'Аудиосистема', icon: 'Volume2' },
      { id: 'accessories-navigation', name: 'Навигация', icon: 'Map' },
      { id: 'accessories-roof', name: 'Багажник на крышу', icon: 'Package' },
      { id: 'accessories-mats', name: 'Коврики', icon: 'Square' },
      { id: 'accessories-protection', name: 'Защита', icon: 'Shield' },
    ]
  },
];

interface CarPartsTreeProps {
  onCategorySelect?: (path: string[]) => void;
}

export const CarPartsTree = ({ onCategorySelect }: CarPartsTreeProps) => {
  const [path, setPath] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<PartNode | null>(null);

  const getCurrentLevel = (): PartNode[] => {
    if (path.length === 0) return partsTree;

    let current: PartNode[] = partsTree;
    for (const id of path) {
      const node = current.find(n => n.id === id);
      if (!node || !node.children) return [];
      current = node.children;
    }
    return current;
  };

  const handleNodeClick = (node: PartNode) => {
    if (node.children && node.children.length > 0) {
      setPath([...path, node.id]);
      setSelectedNode(node);
    } else {
      const fullPath = [...path, node.id];
      setSelectedNode(node);
      onCategorySelect?.(fullPath);
    }
  };

  const handleBack = () => {
    if (path.length > 0) {
      const newPath = path.slice(0, -1);
      setPath(newPath);
      setSelectedNode(null);
    }
  };

  const handleReset = () => {
    setPath([]);
    setSelectedNode(null);
  };

  const getCurrentNodes = getCurrentLevel();
  const breadcrumbs: { id: string; name: string }[] = [];
  
  let tempTree = partsTree;
  for (const id of path) {
    const node = tempTree.find(n => n.id === id);
    if (node) {
      breadcrumbs.push({ id: node.id, name: node.name });
      if (node.children) tempTree = node.children;
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="List" size={20} className="text-primary" />
            <h3 className="font-semibold">Каталог запчастей</h3>
          </div>
          {path.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <Icon name="Home" size={16} className="mr-1" />
              В начало
            </Button>
          )}
        </div>

        {breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 mb-4 text-sm flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-7 px-2 text-muted-foreground hover:text-primary"
            >
              Главная
            </Button>
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center gap-2">
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                <span className={index === breadcrumbs.length - 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                  {crumb.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {path.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="w-full mb-3"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {getCurrentNodes.map((node) => (
            <Button
              key={node.id}
              variant="outline"
              onClick={() => handleNodeClick(node)}
              className="h-auto py-3 px-4 justify-start hover:bg-primary/10 hover:border-primary transition-all"
            >
              <Icon name={node.icon as any} size={18} className="mr-2 flex-shrink-0 text-primary" />
              <span className="text-left flex-1">{node.name}</span>
              {node.children && node.children.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {node.children.length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {selectedNode && !selectedNode.children && (
          <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={selectedNode.icon as any} size={20} className="text-primary" />
              <p className="font-semibold">{selectedNode.name}</p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Показать запчасти
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};