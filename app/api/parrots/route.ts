import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Check if we're running on Netlify
const isNetlify = process.env.NETLIFY === 'true';

export async function GET() {
  if (isNetlify) {
    // On Netlify, return empty array to show that data can't be persisted
    console.log('Netlify deployment: Returning empty parrots array (demo mode)');
    return NextResponse.json([]);
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

