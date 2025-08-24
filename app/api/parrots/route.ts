import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Check if we're running on Netlify
const isNetlify = process.env.NETLIFY === 'true';

// Demo data for Netlify deployment
const demoParrots = [
  {
    id: 'demo-1',
    name: 'Charlie',
    species: 'African Grey',
    age_months: 18,
    price_eur: 1200,
    availability: 'available',
    cover_image_url: 'https://images.unsplash.com/photo-1560151206-1d32a2a4d862?w=800&h=600&auto=format&fit=crop&crop=center&q=100',
    image_urls: [
      'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&h=600&auto=format&fit=crop&crop=center&q=100',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&auto=format&fit=crop&crop=center&q=100'
    ],
    video_urls: [],
    description: 'Papagaj shumë inteligjent dhe miqësor. I pëlqen të mësojë fjalë të reja dhe është i socializuar mirë.',
    training_basic_eur: 200,
    training_advanced_eur: 400,
    created_at: '2025-08-24T12:00:00.000Z',
    updated_at: '2025-08-24T12:00:00.000Z'
  },
  {
    id: 'demo-2',
    name: 'Bella',
    species: 'Macaw',
    age_months: 24,
    price_eur: 2500,
    availability: 'available',
    cover_image_url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&h=600&auto=format&fit=crop&crop=center&q=100',
    image_urls: [
      'https://images.unsplash.com/photo-1560151206-1d32a2a4d862?w=800&h=600&auto=format&fit=crop&crop=center&q=100'
    ],
    video_urls: [],
    description: 'Macaw i bukur me ngjyra të ndezura. Shumë aktiv dhe i lumtur.',
    training_basic_eur: 300,
    training_advanced_eur: 500,
    created_at: '2025-08-24T11:00:00.000Z',
    updated_at: '2025-08-24T11:00:00.000Z'
  }
];

export async function GET() {
  if (isNetlify) {
    // On Netlify, return demo data
    console.log('Netlify deployment: Returning demo parrots data');
    return NextResponse.json(demoParrots);
  }

  // Local development: read from file
  try {
    const filePath = join(process.cwd(), 'data', 'parrots.json');
    const fileContent = await readFile(filePath, 'utf-8');
    const parrots = JSON.parse(fileContent);
    
    // Sort by created_at descending
    parrots.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return NextResponse.json(parrots);
  } catch (error) {
    console.error('Error reading parrots:', error);
    return NextResponse.json([]);
  }
}

