import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const filePath = join(process.cwd(), 'data', 'parrots.json');
    const fileContent = await readFile(filePath, 'utf-8');
    const parrots = JSON.parse(fileContent);
    
    const parrot = parrots.find((p: any) => p.id === params.id);
    if (!parrot) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    return NextResponse.json(parrot);
  } catch (error) {
    console.error('Error reading parrot:', error);
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

