export interface PartArticle {
  id: string;
  name: string;
  brand: string;
  article: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  isOriginal: boolean;
  crossNumbers?: string[];
  compatibleCars?: string[];
}

export interface FluidProduct {
  id: string;
  name: string;
  brand: string;
  article: string;
  price: number;
  image: string;
  type: 'oil' | 'antifreeze' | 'washer';
  viscosity?: string;
  volume: string;
  specifications?: string[];
}

export const engineParts: PartArticle[] = [
  { id: 'e001', name: 'Масляный фильтр', brand: 'Toyota', article: '90915-YZZF2', price: 890, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300', category: 'engine', subcategory: 'filters', isOriginal: true, crossNumbers: ['MANN W 75/3', 'MAHLE OC 264', 'BOSCH 0 451 103 316'], compatibleCars: ['Toyota Camry', 'Toyota Corolla', 'Toyota RAV4'] },
  { id: 'e002', name: 'Воздушный фильтр', brand: 'Toyota', article: '17801-21050', price: 1250, image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=300', category: 'engine', subcategory: 'filters', isOriginal: true, crossNumbers: ['MANN C 27 192/1', 'FILTRON AP 182/4'], compatibleCars: ['Toyota Camry XV70'] },
  { id: 'e003', name: 'Свеча зажигания', brand: 'Toyota', article: '90919-01253', price: 650, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'engine', subcategory: 'ignition', isOriginal: true, crossNumbers: ['NGK ILKAR7B11', 'DENSO IK20'], compatibleCars: ['Toyota Camry', 'Toyota RAV4'] },
  { id: 'e004', name: 'Ремень ГРМ', brand: 'Toyota', article: '13568-09041', price: 3200, image: 'https://images.unsplash.com/photo-1614359399806-0e73b80297c6?w=300', category: 'engine', subcategory: 'timing', isOriginal: true, crossNumbers: ['GATES 5608XS', 'CONTITECH CT1134'], compatibleCars: ['Toyota Camry', 'Toyota Avensis'] },
  { id: 'e005', name: 'Помпа водяная', brand: 'Toyota', article: '16100-09541', price: 4500, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', category: 'engine', subcategory: 'cooling', isOriginal: true, crossNumbers: ['AISIN WPT-174', 'HEPU P974'], compatibleCars: ['Toyota Camry', 'Toyota Highlander'] },
  
  { id: 'e006', name: 'Масляный фильтр', brand: 'BMW', article: '11427566327', price: 1200, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300', category: 'engine', subcategory: 'filters', isOriginal: true, crossNumbers: ['MANN HU 7008 z', 'MAHLE OX 371D'], compatibleCars: ['BMW 3 Series', 'BMW 5 Series'] },
  { id: 'e007', name: 'Воздушный фильтр', brand: 'BMW', article: '13717602643', price: 1450, image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=300', category: 'engine', subcategory: 'filters', isOriginal: true, crossNumbers: ['MANN C 30 165', 'MAHLE LX 2616'], compatibleCars: ['BMW 3 Series F30'] },
  { id: 'e008', name: 'Свеча зажигания', brand: 'BMW', article: '12120037607', price: 890, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'engine', subcategory: 'ignition', isOriginal: true, crossNumbers: ['NGK BKR6EQUP', 'BOSCH FR7KPP332S'], compatibleCars: ['BMW 3 Series', 'BMW X5'] },
  
  { id: 'e009', name: 'Масляный фильтр', brand: 'Mercedes-Benz', article: 'A6511800009', price: 1350, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300', category: 'engine', subcategory: 'filters', isOriginal: true, crossNumbers: ['MANN W 610/3', 'MAHLE OC 217'], compatibleCars: ['Mercedes-Benz C-Class', 'Mercedes-Benz E-Class'] },
  { id: 'e010', name: 'Воздушный фильтр', brand: 'Mercedes-Benz', article: 'A2760940004', price: 1580, image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=300', category: 'engine', subcategory: 'filters', isOriginal: true, crossNumbers: ['MANN C 30 005', 'FILTRON AP 181/5'], compatibleCars: ['Mercedes-Benz GLE'] },
];

export const brakeParts: PartArticle[] = [
  { id: 'b001', name: 'Тормозные колодки передние', brand: 'Toyota', article: '04465-02330', price: 3200, image: 'https://images.unsplash.com/photo-1625047508934-a7641c960338?w=300', category: 'brakes', subcategory: 'pads', isOriginal: true, crossNumbers: ['BREMBO P 83 115', 'TRW GDB3565', 'ATE 13.0460-7289.2'], compatibleCars: ['Toyota Camry', 'Toyota Avalon'] },
  { id: 'b002', name: 'Тормозной диск передний', brand: 'Toyota', article: '43512-06180', price: 5400, image: 'https://images.unsplash.com/photo-1599046732679-27c8e37b4b38?w=300', category: 'brakes', subcategory: 'discs', isOriginal: true, crossNumbers: ['BREMBO 09.C878.11', 'ZIMMERMANN 150.3496.00'], compatibleCars: ['Toyota Camry XV70'] },
  { id: 'b003', name: 'Тормозные колодки задние', brand: 'Toyota', article: '04466-06090', price: 2800, image: 'https://images.unsplash.com/photo-1625047508934-a7641c960338?w=300', category: 'brakes', subcategory: 'pads', isOriginal: true, crossNumbers: ['BREMBO P 83 116', 'TRW GDB3566'], compatibleCars: ['Toyota Camry', 'Toyota RAV4'] },
  
  { id: 'b004', name: 'Тормозные колодки передние', brand: 'BMW', article: '34116799766', price: 4200, image: 'https://images.unsplash.com/photo-1625047508934-a7641c960338?w=300', category: 'brakes', subcategory: 'pads', isOriginal: true, crossNumbers: ['BREMBO P 06 073', 'ATE 13.0460-7314.2'], compatibleCars: ['BMW 3 Series F30', 'BMW 4 Series'] },
  { id: 'b005', name: 'Тормозной диск передний', brand: 'BMW', article: '34116792219', price: 6800, image: 'https://images.unsplash.com/photo-1599046732679-27c8e37b4b38?w=300', category: 'brakes', subcategory: 'discs', isOriginal: true, crossNumbers: ['BREMBO 09.C493.11', 'ZIMMERMANN 150.3459.52'], compatibleCars: ['BMW 3 Series F30'] },
];

export const suspensionParts: PartArticle[] = [
  { id: 's001', name: 'Амортизатор передний', brand: 'Toyota', article: '48510-69835', price: 8500, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', category: 'suspension', subcategory: 'shocks', isOriginal: true, crossNumbers: ['KYB 339232', 'SACHS 313 636', 'MONROE E1447'], compatibleCars: ['Toyota Camry XV70'] },
  { id: 's002', name: 'Стойка стабилизатора', brand: 'Toyota', article: '48820-06070', price: 1200, image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300', category: 'suspension', subcategory: 'stabilizer', isOriginal: true, crossNumbers: ['MOOG TO-LS-13934', 'TRW JTS7582'], compatibleCars: ['Toyota Camry', 'Toyota RAV4'] },
  { id: 's003', name: 'Рычаг передний нижний', brand: 'Toyota', article: '48068-09570', price: 6800, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', category: 'suspension', subcategory: 'arms', isOriginal: true, crossNumbers: ['MOOG TO-WP-14147', 'TRW JTC1534'], compatibleCars: ['Toyota Camry XV50'] },
];

export const fluids: FluidProduct[] = [
  { id: 'f001', name: 'Моторное масло Toyota 5W-30', brand: 'Toyota', article: '08880-80845', price: 3250, image: 'https://images.unsplash.com/photo-1558985250-f39f187f6e9e?w=300', type: 'oil', viscosity: '5W-30', volume: '5L', specifications: ['API SN', 'ILSAC GF-5'] },
  { id: 'f002', name: 'Моторное масло Mobil 1 ESP 5W-30', brand: 'Mobil', article: '154294', price: 3890, image: 'https://images.unsplash.com/photo-1614359399806-0e73b80297c6?w=300', type: 'oil', viscosity: '5W-30', volume: '4L', specifications: ['ACEA C3', 'BMW LL-04', 'MB 229.51'] },
  { id: 'f003', name: 'Моторное масло Castrol EDGE 5W-40', brand: 'Castrol', article: '15669A', price: 3650, image: 'https://images.unsplash.com/photo-1558985250-f39f187f6e9e?w=300', type: 'oil', viscosity: '5W-40', volume: '4L', specifications: ['ACEA C3', 'API SN', 'VW 502.00'] },
  { id: 'f004', name: 'Моторное масло Shell Helix Ultra 5W-40', brand: 'Shell', article: '550046374', price: 3590, image: 'https://images.unsplash.com/photo-1614359399806-0e73b80297c6?w=300', type: 'oil', viscosity: '5W-40', volume: '4L', specifications: ['ACEA A3/B4', 'API SN', 'MB 229.5'] },
  { id: 'f005', name: 'Моторное масло Lukoil Genesis Armortech 5W-30', brand: 'Lukoil', article: '1632647', price: 1890, image: 'https://images.unsplash.com/photo-1558985250-f39f187f6e9e?w=300', type: 'oil', viscosity: '5W-30', volume: '4L', specifications: ['API SN', 'ILSAC GF-5'] },
  { id: 'f006', name: 'Моторное масло Total Quartz 9000 5W-40', brand: 'Total', article: '166245', price: 3200, image: 'https://images.unsplash.com/photo-1614359399806-0e73b80297c6?w=300', type: 'oil', viscosity: '5W-40', volume: '4L', specifications: ['ACEA A3/B4', 'API SN'] },
  
  { id: 'f007', name: 'Антифриз Toyota Long Life Coolant', brand: 'Toyota', article: '08889-80014', price: 1250, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', type: 'antifreeze', volume: '4L', specifications: ['Super Long Life'] },
  { id: 'f008', name: 'Антифриз Liqui Moly Langzeit Kuhlerfrostschutz GTL12 Plus', brand: 'Liqui Moly', article: '8841', price: 890, image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300', type: 'antifreeze', volume: '1L', specifications: ['G12+', 'VW TL 774-F'] },
  { id: 'f009', name: 'Антифриз Motul Inugel Optimal', brand: 'Motul', article: '107208', price: 950, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', type: 'antifreeze', volume: '1L', specifications: ['G12/G12+', 'ASTM D3306'] },
  { id: 'f010', name: 'Антифриз Felix Carbox G12+', brand: 'Felix', article: '430206026', price: 420, image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300', type: 'antifreeze', volume: '1L', specifications: ['G12+'] },
  { id: 'f011', name: 'Антифриз AGA Z65', brand: 'AGA', article: 'AGA045Z', price: 1450, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', type: 'antifreeze', volume: '5L', specifications: ['Концентрат', 'G11'] },
  
  { id: 'f012', name: 'Незамерзающая жидкость -30°C', brand: 'Sintec', article: '800418', price: 180, image: 'https://images.unsplash.com/photo-1603512500383-f2169d8c0ad4?w=300', type: 'washer', volume: '4L', specifications: ['-30°C'] },
  { id: 'f013', name: 'Незамерзайка Hi-Gear -25°C', brand: 'Hi-Gear', article: 'HG5648', price: 250, image: 'https://images.unsplash.com/photo-1603512500383-f2169d8c0ad4?w=300', type: 'washer', volume: '4L', specifications: ['-25°C', 'С отдушкой'] },
  { id: 'f014', name: 'Омывайка Liqui Moly Antifrost Scheiben-Frostschutz', brand: 'Liqui Moly', article: '1514', price: 490, image: 'https://images.unsplash.com/photo-1603512500383-f2169d8c0ad4?w=300', type: 'washer', volume: '2L', specifications: ['-27°C', 'Концентрат'] },
  { id: 'f015', name: 'Незамерзайка Grass -40°C', brand: 'Grass', article: '110302', price: 320, image: 'https://images.unsplash.com/photo-1603512500383-f2169d8c0ad4?w=300', type: 'washer', volume: '5L', specifications: ['-40°C'] },
];

export const allParts = [...engineParts, ...brakeParts, ...suspensionParts];

export const getPartsByCategory = (category: string, subcategory?: string): PartArticle[] => {
  let parts = allParts.filter(p => p.category === category);
  if (subcategory) {
    parts = parts.filter(p => p.subcategory === subcategory);
  }
  return parts;
};

export const getPartsByCar = (carBrand: string, carModel: string): PartArticle[] => {
  return allParts.filter(p => 
    p.compatibleCars?.some(car => 
      car.toLowerCase().includes(carBrand.toLowerCase()) && 
      car.toLowerCase().includes(carModel.toLowerCase())
    )
  );
};

export const getFluidsByType = (type?: 'oil' | 'antifreeze' | 'washer'): FluidProduct[] => {
  if (!type) return fluids;
  return fluids.filter(f => f.type === type);
};