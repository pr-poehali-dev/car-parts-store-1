const carImageDatabase: Record<string, Record<string, string>> = {
  'Toyota': {
    'Camry': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    'Corolla': 'https://images.unsplash.com/photo-1623869675781-80aa31bfa4e6?w=800',
    'RAV4': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    'Land Cruiser': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    'Highlander': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    'Prius': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    'default': 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800'
  },
  'BMW': {
    '3 Series': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    '5 Series': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    'X5': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    'X3': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    'M3': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
    'default': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
  },
  'Mercedes-Benz': {
    'C-Class': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    'E-Class': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    'S-Class': 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800',
    'GLC': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    'GLE': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    'default': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'
  },
  'Audi': {
    'A4': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    'A6': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    'Q5': 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
    'Q7': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800',
    'default': 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800'
  },
  'Volkswagen': {
    'Golf': 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800',
    'Passat': 'https://images.unsplash.com/photo-1625231334168-35067f8b5b93?w=800',
    'Tiguan': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    'Polo': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    'default': 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800'
  },
  'Ford': {
    'Focus': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    'Mustang': 'https://images.unsplash.com/photo-1584345604476-8ec5f8e7f2f8?w=800',
    'Explorer': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    'F-150': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    'default': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
  },
  'Honda': {
    'Civic': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    'Accord': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    'CR-V': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    'default': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'
  },
  'Nissan': {
    'Qashqai': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    'X-Trail': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    'Altima': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    'GT-R': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
    'default': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
  },
  'Mazda': {
    'CX-5': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    'Mazda3': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    'MX-5': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    'default': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
  },
  'Hyundai': {
    'Tucson': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    'Sonata': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    'Santa Fe': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    'default': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
  },
  'Kia': {
    'Sportage': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    'Sorento': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    'Rio': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    'default': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
  }
};

export const getCarImage = (brand: string, model: string): string => {
  const brandImages = carImageDatabase[brand];
  if (!brandImages) {
    return 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800';
  }
  return brandImages[model] || brandImages['default'] || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800';
};