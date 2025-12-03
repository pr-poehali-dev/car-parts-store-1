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
  { name: 'Toyota', models: ['4Runner', 'Alphard', 'Aurion', 'Auris', 'Avalon', 'Avensis', 'Aygo', 'bZ4X', 'C-HR', 'Camry', 'Carina', 'Celica', 'Corolla', 'Corolla Cross', 'Corona', 'Crown', 'FJ Cruiser', 'Fortuner', 'GR86', 'GR Supra', 'GR Yaris', 'Harrier', 'Highlander', 'Hilux', 'Innova', 'Land Cruiser', 'Land Cruiser Prado', 'Mark II', 'Matrix', 'Mirai', 'MR2', 'Prius', 'Prius+', 'Probox', 'RAV4', 'Rush', 'Sequoia', 'Sienna', 'Starlet', 'Succeed', 'Supra', 'Tacoma', 'Tercel', 'Tundra', 'Urban Cruiser', 'Vellfire', 'Venza', 'Verso', 'Vios', 'Vitz', 'Yaris', 'Yaris Cross'] },
  { name: 'BMW', models: ['1 Series', '2 Series', '2 Series Active Tourer', '2 Series Gran Coupe', '3 Series', '3 Series GT', '4 Series', '5 Series', '5 Series GT', '6 Series', '6 Series GT', '7 Series', '8 Series', 'i3', 'i4', 'i7', 'i8', 'iX', 'iX1', 'iX3', 'M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'X1', 'X2', 'X3', 'X3 M', 'X4', 'X4 M', 'X5', 'X5 M', 'X6', 'X6 M', 'X7', 'XM', 'Z3', 'Z4', 'Z8'] },
  { name: 'Mercedes-Benz', models: ['A-Class', 'AMG GT', 'B-Class', 'C-Class', 'CL-Class', 'CLA', 'CLC', 'CLK', 'CLS', 'E-Class', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'EQV', 'G-Class', 'GL-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLK', 'GLS', 'Maybach', 'ML-Class', 'R-Class', 'S-Class', 'SL-Class', 'SLC', 'SLK', 'SLR McLaren', 'Sprinter', 'V-Class', 'Vaneo', 'Viano', 'Vito', 'X-Class'] },
  { name: 'Audi', models: ['100', '80', '90', 'A1', 'A2', 'A3', 'A4', 'A4 Allroad', 'A5', 'A6', 'A6 Allroad', 'A7', 'A8', 'e-tron', 'e-tron GT', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'Q8 e-tron', 'R8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS Q3', 'RS Q8', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ5', 'SQ7', 'SQ8', 'TT', 'TTS'] },
  { name: 'Volkswagen', models: ['Amarok', 'Arteon', 'Atlas', 'Beetle', 'Bora', 'Caddy', 'Caravelle', 'CC', 'Crafter', 'Eos', 'Fox', 'Golf', 'Golf Plus', 'Golf Sportsvan', 'ID.3', 'ID.4', 'ID.5', 'ID.Buzz', 'Jetta', 'Lupo', 'Multivan', 'Passat', 'Passat CC', 'Phaeton', 'Pointer', 'Polo', 'Routan', 'Scirocco', 'Sharan', 'T-Cross', 'T-Roc', 'Taos', 'Tiguan', 'Tiguan Allspace', 'Touareg', 'Touran', 'Transporter', 'Up!', 'Vento'] },
  { name: 'Ford', models: ['B-MAX', 'Bronco', 'Bronco Sport', 'C-MAX', 'Contour', 'Courier', 'Crown Victoria', 'EcoSport', 'Edge', 'Escape', 'Escort', 'Excursion', 'Expedition', 'Explorer', 'F-150', 'F-250', 'F-350', 'Fiesta', 'Flex', 'Focus', 'Freestar', 'Fusion', 'Galaxy', 'Granada', 'Ka', 'Kuga', 'Maverick', 'Mondeo', 'Mustang', 'Mustang Mach-E', 'Puma', 'Ranger', 'S-MAX', 'Scorpio', 'Sierra', 'Taurus', 'Territory', 'Thunderbird', 'Tourneo', 'Transit', 'Windstar'] },
  { name: 'Chevrolet', models: ['Alero', 'Astro', 'Avalanche', 'Aveo', 'Blazer', 'Bolt', 'Camaro', 'Captiva', 'Cavalier', 'Cobalt', 'Colorado', 'Corvette', 'Cruze', 'Epica', 'Equinox', 'Express', 'HHR', 'Impala', 'Kalos', 'Lacetti', 'Lumina', 'Malibu', 'Metro', 'Monte Carlo', 'Niva', 'Orlando', 'Prizm', 'Rezzo', 'Silverado', 'Sonic', 'Spark', 'SS', 'Suburban', 'Tacuma', 'Tahoe', 'Tracker', 'Trailblazer', 'Traverse', 'Trax', 'Uplander', 'Venture', 'Volt'] },
  { name: 'Honda', models: ['Accord', 'Acty', 'Airwave', 'Amaze', 'Ascot', 'Avancier', 'Ballade', 'Beat', 'Brio', 'City', 'Civic', 'Clarity', 'Concerto', 'CR-V', 'CR-Z', 'Crosstour', 'CRX', 'Element', 'Elysion', 'e', 'Fit', 'FR-V', 'Freed', 'HR-V', 'Insight', 'Inspire', 'Integra', 'Jazz', 'Jazz Crosstar', 'Legend', 'Life', 'Logo', 'Mobilio', 'N-Box', 'N-One', 'N-WGN', 'NSX', 'Odyssey', 'Orthia', 'Partner', 'Passport', 'Pilot', 'Prelude', 'Prologue', 'Ridgeline', 'S2000', 'Shuttle', 'S-MX', 'Stepwgn', 'Stream', 'Torneo', 'Vamos', 'Vezel', 'Vigor', 'ZR-V'] },
  { name: 'Nissan', models: ['350Z', '370Z', 'Almera', 'Almera Tino', 'Altima', 'Aprio', 'Armada', 'Ariya', 'Avenir', 'Bluebird', 'Caravan', 'Cefiro', 'Cube', 'Elgrand', 'Evalia', 'Frontier', 'GT-R', 'Juke', 'Kicks', 'Latio', 'Laurel', 'Leaf', 'March', 'Maxima', 'Micra', 'Murano', 'Navara', 'Note', 'NP300', 'NV200', 'Pathfinder', 'Patrol', 'Presage', 'Primastar', 'Primera', 'Pulsar', 'Qashqai', 'Quest', 'Rogue', 'Sentra', 'Serena', 'Silvia', 'Skyline', 'Sunny', 'Terrano', 'Tiida', 'Titan', 'Versa', 'X-Trail', 'Xterra'] },
  { name: 'Mazda', models: ['2', '3', '323', '5', '6', '626', '929', 'Atenza', 'Axela', 'B-Series', 'Bongo', 'BT-50', 'Carol', 'CX-3', 'CX-30', 'CX-5', 'CX-50', 'CX-7', 'CX-9', 'CX-60', 'CX-90', 'Demio', 'E-Series', 'Millenia', 'MPV', 'MX-3', 'MX-5', 'MX-30', 'MX-6', 'Navajo', 'Premacy', 'Protege', 'RX-7', 'RX-8', 'Tribute', 'Verisa', 'Xedos'] },
  { name: 'Hyundai', models: ['Accent', 'Atos', 'Avante', 'Azera', 'Bayon', 'Creta', 'Elantra', 'Entourage', 'Eon', 'Equus', 'Excel', 'Galloper', 'Genesis', 'Getz', 'Grand i10', 'Grand Santa Fe', 'Grandeur', 'H-1', 'H100', 'i10', 'i20', 'i30', 'i40', 'Ioniq', 'Ioniq 5', 'Ioniq 6', 'ix20', 'ix35', 'ix55', 'Kona', 'Lantra', 'Matrix', 'Nexo', 'Palisade', 'Pony', 'Santa Fe', 'Santamo', 'Sonata', 'Starex', 'Staria', 'Terracan', 'Trajet', 'Tucson', 'Veloster', 'Venue', 'Veracruz', 'Verna', 'XG'] },
  { name: 'Kia', models: ['Avella', 'Besta', 'Borrego', 'Cadenza', 'Capital', 'Carens', 'Carnival', 'Ceed', 'Cerato', 'Clarus', 'EV6', 'EV9', 'Forte', 'K3', 'K5', 'K8', 'K9', 'Magentis', 'Mohave', 'Morning', 'Niro', 'Opirus', 'Optima', 'Picanto', 'Pregio', 'Pride', 'ProCeed', 'Quoris', 'Ray', 'Retona', 'Rio', 'Sephia', 'Shuma', 'Seltos', 'Sorento', 'Soul', 'Spectra', 'Sportage', 'Stinger', 'Stonic', 'Telluride', 'Venga', 'XCeed'] },
  { name: 'Lexus', models: ['CT', 'ES', 'GS', 'GX', 'HS', 'IS', 'LC', 'LFA', 'LS', 'LX', 'NX', 'RC', 'RX', 'RZ', 'SC', 'UX'] },
  { name: 'Volvo', models: ['240', '340', '360', '440', '460', '480', '740', '760', '780', '850', '940', '960', 'C30', 'C40', 'C70', 'EX30', 'EX90', 'S40', 'S60', 'S70', 'S80', 'S90', 'V40', 'V40 Cross Country', 'V50', 'V60', 'V60 Cross Country', 'V70', 'V90', 'V90 Cross Country', 'XC40', 'XC60', 'XC70', 'XC90'] },
  { name: 'Subaru', models: ['Alcyone', 'Ascent', 'Baja', 'BRZ', 'Crosstrek', 'Exiga', 'Forester', 'Impreza', 'Justy', 'Legacy', 'Leone', 'Levorg', 'Libero', 'Loyale', 'Outback', 'Pleo', 'Rex', 'Sambar', 'Solterra', 'Stella', 'SVX', 'Trezia', 'Tribeca', 'Vivio', 'WRX', 'XT', 'XV'] },
  { name: 'Mitsubishi', models: ['3000GT', 'ASX', 'Airtrek', 'Aspire', 'Attrage', 'Carisma', 'Challenger', 'Chariot', 'Colt', 'Delica', 'Diamante', 'Dignity', 'Eclipse', 'Eclipse Cross', 'eK', 'Endeavor', 'Outlander', 'Galant', 'Grandis', 'i-MiEV', 'L200', 'L300', 'Lancer', 'Lancer Evolution', 'Legnum', 'Minica', 'Mirage', 'Montero', 'Outlander', 'Outlander Sport', 'Pajero', 'Pajero iO', 'Pajero Mini', 'Pajero Pinin', 'Pajero Sport', 'Raider', 'RVR', 'Sapporo', 'Sigma', 'Space Gear', 'Space Runner', 'Space Star', 'Space Wagon', 'Starion', 'Toppo', 'Town Box', 'Tredia', 'Xpander'] },
  { name: 'Peugeot', models: ['1007', '104', '106', '107', '108', '2008', '205', '206', '207', '208', '3008', '301', '305', '306', '307', '308', '309', '4007', '4008', '405', '406', '407', '5008', '504', '505', '508', '604', '605', '607', '806', '807', 'Bipper', 'Boxer', 'e-2008', 'e-208', 'Expert', 'iOn', 'Landtrek', 'Partner', 'RCZ', 'Rifter', 'Traveller'] },
  { name: 'Renault', models: ['11', '18', '19', '21', '25', '4', '5', '9', 'Alaskan', 'Arkana', 'Avantime', 'Captur', 'Clio', 'Dokker', 'Duster', 'Espace', 'Express', 'Fluence', 'Fuego', 'Grand Espace', 'Grand Modus', 'Grand Scenic', 'Kadjar', 'Kangoo', 'Kaptur', 'Koleos', 'Laguna', 'Latitude', 'Logan', 'Master', 'Megane', 'Modus', 'Rapid', 'Safrane', 'Sandero', 'Scenic', 'Symbol', 'Talisman', 'Thalia', 'Trafic', 'Twingo', 'Twizy', 'Vel Satis', 'Wind', 'Zoe'] },
  { name: 'Skoda', models: ['105', '120', '130', 'Citigo', 'Enyaq', 'Fabia', 'Favorit', 'Felicia', 'Forman', 'Kamiq', 'Karoq', 'Kodiaq', 'Octavia', 'Praktik', 'Rapid', 'Roomster', 'Scala', 'Superb', 'Yeti'] },
  { name: 'Opel', models: ['Adam', 'Agila', 'Ampera', 'Antara', 'Ascona', 'Astra', 'Calibra', 'Campo', 'Cascada', 'Combo', 'Commodore', 'Corsa', 'Crossland', 'Diplomat', 'Frontera', 'Grandland', 'GT', 'Insignia', 'Kadett', 'Karl', 'Manta', 'Meriva', 'Mokka', 'Monza', 'Movano', 'Omega', 'Rekord', 'Senator', 'Signum', 'Sintra', 'Tigra', 'Vectra', 'Vivaro', 'Zafira'] },
  { name: 'Lada', models: ['110', '111', '112', '2101', '2102', '2103', '2104', '2105', '2106', '2107', '2108', '2109', '21099', '2110', '2111', '2112', '2113', '2114', '2115', '2120', '2121', '2131', 'Granta', 'Kalina', 'Largus', 'Niva', 'Niva Legend', 'Niva Travel', 'Oka', 'Priora', 'Samara', 'Vesta', 'XRAY'] },
  { name: 'Chery', models: ['Amulet', 'Arrizo 3', 'Arrizo 5', 'Arrizo 6', 'Arrizo 7', 'Arrizo 8', 'Bonus', 'CrossEastar', 'E5', 'Eastar', 'eQ', 'Exeed LX', 'Exeed RX', 'Exeed TXL', 'Exeed VX', 'Fora', 'Kimo', 'M11', 'QQ', 'QQ6', 'Sweet', 'Tiggo', 'Tiggo 2', 'Tiggo 3', 'Tiggo 4', 'Tiggo 5', 'Tiggo 7', 'Tiggo 8', 'Very'] },
  { name: 'Geely', models: ['Atlas', 'Atlas Pro', 'Azkarra', 'Binrui', 'Coolray', 'Emgrand', 'Emgrand 7', 'Emgrand EC7', 'Emgrand GS', 'Emgrand GT', 'Emgrand X7', 'GC6', 'GC9', 'LC', 'MK', 'MK Cross', 'Monjaro', 'Okavango', 'Otaka', 'Preface', 'SC7', 'Tugella', 'Vision'] },
  { name: 'Haval', models: ['Dargo', 'F5', 'F7', 'F7x', 'H2', 'H3', 'H5', 'H6', 'H8', 'H9', 'Jolion', 'M6'] },
  { name: 'Porsche', models: ['911', '914', '918 Spyder', '924', '928', '944', '968', '718 Boxster', '718 Cayman', 'Boxster', 'Carrera GT', 'Cayenne', 'Cayman', 'Macan', 'Panamera', 'Taycan'] },
  { name: 'Land Rover', models: ['Defender', 'Discovery', 'Discovery 3', 'Discovery 4', 'Discovery 5', 'Discovery Sport', 'Freelander', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'] },
  { name: 'Jaguar', models: ['E-Pace', 'E-Type', 'F-Pace', 'F-Type', 'I-Pace', 'S-Type', 'X-Type', 'XE', 'XF', 'XJ', 'XJR', 'XJS', 'XK', 'XKR'] },
  { name: 'Jeep', models: ['Cherokee', 'CJ', 'Commander', 'Comanche', 'Compass', 'Gladiator', 'Grand Cherokee', 'Grand Wagoneer', 'Liberty', 'Patriot', 'Renegade', 'Wagoneer', 'Wrangler'] },
  { name: 'Infiniti', models: ['EX', 'FX', 'G', 'I', 'J', 'JX', 'M', 'Q30', 'Q40', 'Q45', 'Q50', 'Q60', 'Q70', 'QX30', 'QX4', 'QX50', 'QX55', 'QX56', 'QX60', 'QX70', 'QX80'] },
  { name: 'Acura', models: ['CL', 'CSX', 'EL', 'ILX', 'Integra', 'Legend', 'MDX', 'NSX', 'RDX', 'RL', 'RLX', 'RSX', 'SLX', 'TL', 'TLX', 'TSX', 'Vigor', 'ZDX'] },
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