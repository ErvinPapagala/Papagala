import { NextRequest, NextResponse } from 'next/server';
import { guardAdminApi } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

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

    const bucket = 'parrots';
    
    // Try Supabase storage first
    try {
      // Ensure bucket exists (ignore if exists)
      await supabaseAdmin.storage.createBucket(bucket, { public: true });
    } catch (e) {
      // Bucket might already exist, continue
    }

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const rand = crypto.randomUUID();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `uploads/${yyyy}/${mm}/${rand}-${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    
    // Try Supabase upload
    const { data, error } = await supabaseAdmin.storage.from(bucket).upload(path, new Uint8Array(arrayBuffer), {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      console.error('Supabase upload error:', error);
      
      // Fallback: save to public folder
      try {
        const publicDir = join(process.cwd(), 'public', 'uploads', yyyy.toString(), mm);
        await mkdir(publicDir, { recursive: true });
        
        const fileName = `${rand}-${safeName}`;
        const filePath = join(publicDir, fileName);
        await writeFile(filePath, new Uint8Array(arrayBuffer));
        
        const publicUrl = `/uploads/${yyyy}/${mm}/${fileName}`;
        return NextResponse.json({ url: publicUrl, path: publicUrl });
      } catch (fsError) {
        console.error('File system upload error:', fsError);
        return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
      }
    }

    const { data: pub } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: pub.publicUrl, path: data?.path });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
