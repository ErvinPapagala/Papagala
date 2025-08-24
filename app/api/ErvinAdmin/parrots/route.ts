import { NextRequest, NextResponse } from 'next/server';
import { guardAdminApi } from '@/lib/auth';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// Check if we're running on Netlify
const isNetlify = process.env.NETLIFY === 'true';

export async function POST(req: NextRequest) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;

  try {
    const body = await req.json();
    
    // Create new parrot with UUID
    const newParrot = {
      id: crypto.randomUUID(),
      name: body.name,
      species: body.species,
      age_months: body.age_months ?? 0,
      price_eur: body.price_eur ?? 0,
      availability: body.availability || 'available',
      cover_image_url: body.cover_image_url || null,
      image_urls: Array.isArray(body.image_urls) ? body.image_urls : [],
      video_urls: Array.isArray(body.video_urls) ? body.video_urls : [],
      description: body.description || null,
      training_basic_eur: body.training_basic_eur ?? null,
      training_advanced_eur: body.training_advanced_eur ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isNetlify) {
      // On Netlify, we can't write to filesystem, so we'll use a simple external service
      // For now, return success but explain limitation
      console.log('Netlify deployment: Parrot creation simulated:', newParrot);
      return NextResponse.json({ 
        ...newParrot, 
        _note: 'Demo mode: Data not persisted on Netlify. Use local development for full functionality.' 
      });
    }

    // Local development: use file system
    const dataPath = join(process.cwd(), 'data', 'parrots.json');
    let parrots = [];
    try {
      const fileContent = await readFile(dataPath, 'utf-8');
      parrots = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      parrots = [];
    }

    // Add new parrot
    parrots.push(newParrot);

    // Save back to file
    await writeFile(dataPath, JSON.stringify(parrots, null, 2));

    return NextResponse.json(newParrot);
  } catch (error: any) {
    console.error('Error saving parrot:', error);
    return NextResponse.json({ error: error.message || 'Failed to save parrot' }, { status: 500 });
  }
}

