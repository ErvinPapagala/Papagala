import { NextRequest, NextResponse } from 'next/server';
import { guardAdminApi } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Check if we're running on Netlify
const isNetlify = process.env.NETLIFY === 'true';

// Upload endpoint: stores files in bucket "parrots" at path /uploads/{yyyy}/{mm}/{uuid}-{filename}
export async function POST(req: NextRequest) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;

  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.startsWith('multipart/form-data')) {
      return NextResponse.json({ error: 'Content-Type must be multipart/form-data' }, { status: 400 });
    }

    const form = await req.formData();
    const file = form.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    // Validate file type - allow images and videos
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      return NextResponse.json({ error: 'Only image and video files are allowed' }, { status: 400 });
    }

    // Validate file size - different limits for images vs videos
    const maxSize = isVideo ? 15 * 1024 * 1024 : 5 * 1024 * 1024; // 15MB for videos, 5MB for images
    if (file.size > maxSize) {
      const maxSizeMB = isVideo ? '15MB' : '5MB';
      return NextResponse.json({ error: `File size must be less than ${maxSizeMB}` }, { status: 400 });
    }

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const rand = crypto.randomUUID();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    if (isNetlify) {
      // On Netlify, we can't write to filesystem
      // Return a placeholder URL for demo purposes
      const placeholderUrl = `https://images.unsplash.com/photo-1560151206-1d32a2a4d862?w=800&h=600&auto=format&fit=crop&crop=center&q=100`;
      console.log('Netlify deployment: File upload simulated for:', file.name);
      return NextResponse.json({ 
        url: placeholderUrl, 
        path: placeholderUrl,
        _note: 'Demo mode: File not actually uploaded on Netlify. Use local development for full functionality.'
      });
    }

    // Local development: use file system
    const arrayBuffer = await file.arrayBuffer();
    
    try {
      const publicDir = join(process.cwd(), 'public', 'uploads', yyyy.toString(), mm);
      await mkdir(publicDir, { recursive: true });
      
      const fileName = `${rand}-${safeName}`;
      const filePath = join(publicDir, fileName);
      await writeFile(filePath, new Uint8Array(arrayBuffer));
      
      const publicUrl = `/uploads/${yyyy}/${mm}/${fileName}`;
      console.log('File saved locally:', publicUrl);
      return NextResponse.json({ url: publicUrl, path: publicUrl });
    } catch (fsError: any) {
      console.error('File system upload error:', fsError);
      return NextResponse.json({ error: 'Upload failed: ' + (fsError?.message || 'Unknown error') }, { status: 500 });
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
