export interface VinDecodeResult {
  brand: string;
  model: string;
  year: number;
  engine: string;
  engineVolume: string;
  transmission: string;
  bodyType: string;
  generation: string;
  restyling?: string;
  image: string;
}

export interface CarGeneration {
  code: string;
  name: string;
  years: string;
  restyling?: string[];
  engines: EngineOption[];
}

export interface EngineOption {
  code: string;
  volume: string;
  power: string;
  fuel: string;
  transmission: string[];
}

export const vinPrefixes: Record<string, { brand: string; region: string }> = {
  'JTN': { brand: 'Toyota', region: 'Japan' },
  'JTH': { brand: 'Toyota', region: 'Japan' },
  'JTD': { brand: 'Toyota', region: 'Japan' },
  'JTE': { brand: 'Toyota', region: 'Japan' },
  'JTM': { brand: 'Toyota', region: 'Japan' },
  'WBA': { brand: 'BMW', region: 'Germany' },
  'WBS': { brand: 'BMW', region: 'Germany' },
  'WDD': { brand: 'Mercedes-Benz', region: 'Germany' },
  'WDB': { brand: 'Mercedes-Benz', region: 'Germany' },
  'WAU': { brand: 'Audi', region: 'Germany' },
  'WVW': { brand: 'Volkswagen', region: 'Germany' },
  'WVG': { brand: 'Volkswagen', region: 'Germany' },
  '1FA': { brand: 'Ford', region: 'USA' },
  '1FT': { brand: 'Ford', region: 'USA' },
  '1GC': { brand: 'Chevrolet', region: 'USA' },
  '1G1': { brand: 'Chevrolet', region: 'USA' },
  '19U': { brand: 'Honda', region: 'USA' },
  'JHM': { brand: 'Honda', region: 'Japan' },
  'JN1': { brand: 'Nissan', region: 'Japan' },
  'JN8': { brand: 'Nissan', region: 'Japan' },
  'JM1': { brand: 'Mazda', region: 'Japan' },
  'KMH': { brand: 'Hyundai', region: 'Korea' },
  'KNA': { brand: 'Kia', region: 'Korea' },
  'JF1': { brand: 'Subaru', region: 'Japan' },
  'JF2': { brand: 'Subaru', region: 'Japan' },
  'XTA': { brand: 'Lada', region: 'Russia' },
  'Z6F': { brand: 'Ford', region: 'Russia' },
};

export const carGenerations: Record<string, Record<string, CarGeneration[]>> = {
  'Toyota': {
    'Camry': [
      {
        code: 'XV70',
        name: 'XV70',
        years: '2017-2024',
        restyling: ['2017-2020', '2021-2024'],
        engines: [
          { code: '2AR-FE', volume: '2.5L', power: '181 л.с.', fuel: 'Бензин', transmission: ['АКПП', 'МКПП'] },
          { code: '2AR-FXE', volume: '2.5L Hybrid', power: '218 л.с.', fuel: 'Гибрид', transmission: ['E-CVT'] },
          { code: 'A25A-FXS', volume: '2.5L Hybrid', power: '218 л.с.', fuel: 'Гибрид', transmission: ['E-CVT'] },
        ]
      },
      {
        code: 'XV50',
        name: 'XV50',
        years: '2011-2017',
        restyling: ['2011-2014', '2014-2017'],
        engines: [
          { code: '2AR-FE', volume: '2.5L', power: '181 л.с.', fuel: 'Бензин', transmission: ['АКПП', 'МКПП'] },
          { code: '2GR-FE', volume: '3.5L', power: '249 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
        ]
      }
    ],
    'RAV4': [
      {
        code: 'XA50',
        name: 'XA50',
        years: '2018-2024',
        restyling: ['2018-2021', '2021-2024'],
        engines: [
          { code: 'A25A-FKS', volume: '2.5L', power: '199 л.с.', fuel: 'Бензин', transmission: ['АКПП', 'CVT'] },
          { code: 'A25A-FXS', volume: '2.5L Hybrid', power: '222 л.с.', fuel: 'Гибрид', transmission: ['E-CVT'] },
        ]
      }
    ],
    'Corolla': [
      {
        code: 'E210',
        name: 'E210',
        years: '2018-2024',
        restyling: ['2018-2022', '2022-2024'],
        engines: [
          { code: '2ZR-FE', volume: '1.8L', power: '140 л.с.', fuel: 'Бензин', transmission: ['МКПП', 'CVT'] },
          { code: 'M20A-FKS', volume: '2.0L', power: '169 л.с.', fuel: 'Бензин', transmission: ['CVT', 'МКПП'] },
        ]
      }
    ]
  },
  'BMW': {
    '3 Series': [
      {
        code: 'G20',
        name: 'G20',
        years: '2018-2024',
        restyling: ['2018-2022', '2022-2024'],
        engines: [
          { code: 'B48', volume: '2.0L', power: '184 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
          { code: 'B48', volume: '2.0L', power: '258 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
          { code: 'B58', volume: '3.0L', power: '374 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
        ]
      },
      {
        code: 'F30',
        name: 'F30',
        years: '2011-2019',
        restyling: ['2011-2015', '2015-2019'],
        engines: [
          { code: 'N20', volume: '2.0L', power: '184 л.с.', fuel: 'Бензин', transmission: ['АКПП', 'МКПП'] },
          { code: 'N55', volume: '3.0L', power: '306 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
        ]
      }
    ],
    'X5': [
      {
        code: 'G05',
        name: 'G05',
        years: '2018-2024',
        restyling: ['2018-2023', '2023-2024'],
        engines: [
          { code: 'B58', volume: '3.0L', power: '340 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
          { code: 'N63', volume: '4.4L', power: '530 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
        ]
      }
    ]
  },
  'Mercedes-Benz': {
    'C-Class': [
      {
        code: 'W206',
        name: 'W206',
        years: '2021-2024',
        engines: [
          { code: 'M254', volume: '2.0L', power: '204 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
          { code: 'M254', volume: '2.0L', power: '258 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
        ]
      },
      {
        code: 'W205',
        name: 'W205',
        years: '2014-2021',
        restyling: ['2014-2018', '2018-2021'],
        engines: [
          { code: 'M274', volume: '2.0L', power: '184 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
          { code: 'M276', volume: '3.0L', power: '249 л.с.', fuel: 'Бензин', transmission: ['АКПП'] },
        ]
      }
    ]
  }
};

export const decodeVIN = (vin: string): VinDecodeResult | null => {
  if (vin.length !== 17) return null;

  const prefix = vin.substring(0, 3);
  const brandInfo = vinPrefixes[prefix];

  if (!brandInfo) return null;

  const mockModels: Record<string, string[]> = {
    'Toyota': ['Camry', 'Corolla', 'RAV4', 'Land Cruiser'],
    'BMW': ['3 Series', '5 Series', 'X5'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE'],
    'Audi': ['A4', 'A6', 'Q5'],
    'Volkswagen': ['Golf', 'Passat', 'Tiguan'],
  };

  const models = mockModels[brandInfo.brand] || ['Unknown'];
  const model = models[Math.floor(Math.random() * models.length)];

  const yearCode = vin.charAt(9);
  const yearMap: Record<string, number> = {
    'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014,
    'F': 2015, 'G': 2016, 'H': 2017, 'J': 2018, 'K': 2019,
    'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024,
  };
  const year = yearMap[yearCode] || 2020;

  const generations = carGenerations[brandInfo.brand]?.[model];
  const generation = generations?.find(g => {
    const [start, end] = g.years.split('-').map(y => parseInt(y));
    return year >= start && year <= end;
  });

  const engine = generation?.engines[0] || {
    code: '2.0L',
    volume: '2.0L',
    power: '150 л.с.',
    fuel: 'Бензин',
    transmission: ['АКПП']
  };

  return {
    brand: brandInfo.brand,
    model: model,
    year: year,
    engine: engine.code,
    engineVolume: engine.volume,
    transmission: engine.transmission[0],
    bodyType: 'Седан',
    generation: generation?.code || 'Unknown',
    restyling: generation?.restyling ? 
      (year <= parseInt(generation.restyling[0].split('-')[1]) ? generation.restyling[0] : generation.restyling[1]) 
      : undefined,
    image: `https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800`
  };
};