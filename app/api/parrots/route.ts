import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
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

