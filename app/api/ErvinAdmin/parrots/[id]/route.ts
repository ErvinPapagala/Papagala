import { NextRequest, NextResponse } from 'next/server';
import { guardAdminApi } from '@/lib/auth';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;

  try {
    const body = await req.json();
    const dataPath = join(process.cwd(), 'data', 'parrots.json');
    
    // Read current data
    let parrots = [];
    try {
      const fileContent = await readFile(dataPath, 'utf-8');
      parrots = JSON.parse(fileContent);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to read parrots data' }, { status: 500 });
    }

    // Find and update the parrot
    const parrotIndex = parrots.findIndex((p: any) => p.id === params.id);
    if (parrotIndex === -1) {
      return NextResponse.json({ error: 'Parrot not found' }, { status: 404 });
    }

    // Update the parrot
    const updatedParrot = {
      ...parrots[parrotIndex],
      name: body.name,
      species: body.species,
      age_months: body.age_months,
      price_eur: body.price_eur,
      availability: body.availability,
      cover_image_url: body.cover_image_url ?? null,
      image_urls: Array.isArray(body.image_urls) ? body.image_urls : [],
      video_urls: Array.isArray(body.video_urls) ? body.video_urls : [],
      description: body.description ?? null,
      training_basic_eur: body.training_basic_eur ?? null,
      training_advanced_eur: body.training_advanced_eur ?? null,
      updated_at: new Date().toISOString()
    };

    parrots[parrotIndex] = updatedParrot;

    // Save back to file
    await writeFile(dataPath, JSON.stringify(parrots, null, 2));

    return NextResponse.json(updatedParrot);
  } catch (error: any) {
    console.error('Error updating parrot:', error);
    return NextResponse.json({ error: error.message || 'Failed to update parrot' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;

  try {
    const dataPath = join(process.cwd(), 'data', 'parrots.json');
    
    // Read current data
    let parrots = [];
    try {
      const fileContent = await readFile(dataPath, 'utf-8');
      parrots = JSON.parse(fileContent);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to read parrots data' }, { status: 500 });
    }

    // Filter out the parrot to delete
    const filteredParrots = parrots.filter((p: any) => p.id !== params.id);
    
    if (filteredParrots.length === parrots.length) {
      return NextResponse.json({ error: 'Parrot not found' }, { status: 404 });
    }

    // Save back to file
    await writeFile(dataPath, JSON.stringify(filteredParrots, null, 2));

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Error deleting parrot:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete parrot' }, { status: 500 });
  }
}

