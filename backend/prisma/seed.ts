import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SEED_PROJECTS = [
  {
    name: 'Amanoi Resort Pavilion',
    category: 'Hospitality',
    location: 'Ninh Thuan, Vietnam',
    year: 2022,
    area: '1,200 m²',
    budget: '$5.5M',
    architect: 'Jean-Michel Gathy',
    client: 'Aman Resorts',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800'
    ],
    description: 'Perched on the hills of Nui Chua National Park overlooking the crystal waters of Vinh Hy Bay, Amanoi Pavilion seamlessly blends contemporary elegance with traditional Vietnamese architectural styles. The design utilizes locally sourced materials, double-height open pavilions, and clean horizontal lines to harmonize with the spectacular surrounding landscape.',
    features: [
      'Infinity Pool with Bay View',
      'Open-air Dining Pavilions',
      'Sustainable Bamboo & Timber Structures',
      'Traditional Curved Roof Tiling',
      'Natural Ventilation System'
    ],
    views: 420,
    featured: true,
    createdAt: new Date('2022-03-15T08:00:00.000Z')
  },
  {
    name: 'The Oasis Villa',
    category: 'Residential',
    location: 'Thao Dien, District 2, HCMC, Vietnam',
    year: 2024,
    area: '450 m²',
    budget: '$1.8M',
    architect: 'MIA Design Studio',
    client: 'Private Investor',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800'
    ],
    description: 'An architectural sanctuary in the heart of Saigon. The Oasis Villa is designed with raw concrete and glass facades, utilizing a series of floating cantilevers to create shade. The core concept relies on vertical integration of nature, featuring floating pocket gardens, inner courtyards, and a waterfall pool that naturally cools the building microclimate.',
    features: [
      'Raw Concrete Architectural Finish',
      'Internal Courtyard with Skywell',
      'Automated Retractable Glass Roof',
      'Solar Panel Energy Grid',
      'Waterfall Koi Pond'
    ],
    views: 310,
    featured: true,
    createdAt: new Date('2024-01-10T10:30:00.000Z')
  },
  {
    name: 'Grand Horizon Beachfront Hotel',
    category: 'Hospitality',
    location: 'Danang, Vietnam',
    year: 2023,
    area: '18,500 m²',
    budget: '$32M',
    architect: 'Foster + Partners',
    client: 'Horizon Group',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800',
      'https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=800'
    ],
    description: 'The Grand Horizon Hotel stands as a landmark on Danang’s dynamic coastline. Its double-skin facade controls heat gain while providing panoramic views of the East Sea. The structure features a dramatic 30-meter cantilevered rooftop infinity pool that visually merges with the sea horizon.',
    features: [
      '30-meter Cantilevered Rooftop Pool',
      'Double-Skin Energy Efficient Facade',
      'Rainwater Harvesting System',
      'LEED Gold Certification',
      'Acoustic Wave Mitigation Layout'
    ],
    views: 650,
    featured: true,
    createdAt: new Date('2023-08-20T14:15:00.000Z')
  },
  {
    name: 'Metropolis Green Tower',
    category: 'Commercial',
    location: 'Ba Dinh, Hanoi, Vietnam',
    year: 2025,
    area: '42,000 m²',
    budget: '$75M',
    architect: 'Vo Trong Nghia Architects',
    client: 'Metropolis Development',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800'
    ],
    description: 'Redefining the office skyscraper, the Metropolis Green Tower incorporates vertical gardens and bamboo-adorned community spaces throughout its 32 floors. Designed to combat Hanois urban heat island effect, the building features three-story sky gardens and deep balconies with natural planting that act as organic air filters.',
    features: [
      'Vertical Gardens & Sky Parks',
      'Carbon-Negative Bamboo Structure Elements',
      'Smart LED Lighting & HVAC Control',
      'Double Glazed Low-E Glass Walls',
      'Greywater Filtration for Irrigation'
    ],
    views: 540,
    featured: false,
    createdAt: new Date('2025-05-02T09:00:00.000Z')
  },
  {
    name: 'The Slate Pavilion',
    category: 'Landscape',
    location: 'Sapa, Lao Cai, Vietnam',
    year: 2023,
    area: '250 m²',
    budget: '$450K',
    architect: 'H&P Architects',
    client: 'Sapa Eco-Tourism Board',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800'
    ],
    description: 'Hovering over the Muong Hoa valley rice terraces, this pavilion serves as an exhibition and observation spot. Constructed using local slate stone, pine wood, and dark coated steel, the pavilion responds directly to the local topography, appearing as a natural geological outgrowth of the mountain.',
    features: [
      'Local Slate-Stone Flooring & Pillars',
      '360-Degree Panoramic Viewing Deck',
      'Zero-Impact Foundation Design',
      'Recycled Pine Wood Decking',
      'Drip-Irrigation Surrounding Gardens'
    ],
    views: 290,
    featured: false,
    createdAt: new Date('2023-10-05T11:45:00.000Z')
  },
  {
    name: 'Bamboo Sanctum Resort',
    category: 'Hospitality',
    location: 'Ubud, Bali, Indonesia',
    year: 2024,
    area: '3,800 m²',
    budget: '$6.2M',
    architect: 'Ibuku',
    client: 'Sanctum Hospitality',
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800'
    ],
    description: 'A revolutionary bamboo complex consisting of guest villas, yoga shalas, and a wellness center. Built entirely of structural bamboo (Petung and Apus species), the design leverages organic curves, hyperboloid column bundles, and double-helix arches to demonstrate the immense structural possibilities of organic sustainable architecture.',
    features: [
      '100% Structural Bamboo Composition',
      'Organic Double-Helix Vaulted Roofs',
      'Natural Ventilation & Zero AC Design',
      'Non-toxic Boron Treatment Preservative',
      'Geothermal River-water Cooling'
    ],
    views: 890,
    featured: true,
    createdAt: new Date('2024-04-12T07:20:00.000Z')
  },
  {
    name: 'Zenith Sky Penthouse',
    category: 'Interior',
    location: 'District 1, Ho Chi Minh City, Vietnam',
    year: 2024,
    area: '380 m²',
    budget: '$2.5M',
    architect: 'DWP Architects',
    client: 'Luxury Living Ltd',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800'
    ],
    description: 'An interior design masterpiece that redefines luxury penthouses in HCMC. Inspired by minimalist Zen principles, the layout utilizes custom travertine floors, dark oak panels, and invisible details. Double-glazed structural glass walls provide breathtaking 270-degree views of the Saigon River and cityscape.',
    features: [
      'Seamless Travertine Stone Slab Floors',
      'Invisible Sliding Track Doors',
      'Fully Integrated Smart Home (INP)',
      'Custom Floating Oak Staircase',
      'Panoramic Sky Terrace and Jacuzzi'
    ],
    views: 480,
    featured: false,
    createdAt: new Date('2024-09-30T15:00:00.000Z')
  },
  {
    name: 'Dalat Art Library',
    category: 'Commercial',
    location: 'Dalat, Lam Dong, Vietnam',
    year: 2023,
    area: '2,400 m²',
    budget: '$4.1M',
    architect: 'A79 Architects',
    client: 'Dalat Heritage & Art Foundation',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800',
      'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800'
    ],
    description: 'A thoughtful architectural renovation that retrofits a French colonial villa in Dalat into a state-of-the-art public art library. The design connects the historic brick-and-mortar structure with a modern, light-filled steel and glass pavilion, creating a beautiful spatial transition between the old and the new.',
    features: [
      'Colonial Brick Preservation',
      'Structural Glass-and-Steel Connector Pavilion',
      'Custom Oak Reading Desks',
      'Acoustic Plaster Silent Ceilings',
      'Pine Forest Landscaped Reading Courtyards'
    ],
    views: 380,
    featured: false,
    createdAt: new Date('2023-11-18T08:45:00.000Z')
  }
];

async function main() {
  console.log('Seeding Database...');
  const count = await prisma.project.count();
  if (count > 0) {
    console.log('Database already has projects. Skipping seed.');
    return;
  }

  for (const p of SEED_PROJECTS) {
    const created = await prisma.project.create({
      data: p
    });
    console.log(`Successfully seeded project: ${created.name} (${created.id})`);
  }
  console.log('Database Seeding Completed!');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
