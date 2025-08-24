import { NextRequest, NextResponse } from 'next/server';
import { guardAdminApi } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Upload endpoint: stores files in bucket "parrots" at path /uploads/{yyyy}/{mm}/{uuid}-{filename}
export async function POST(req: NextRequest) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.startsWith('multipart/form-data')) {
    return NextResponse.json({ error: 'Content-Type must be multipart/form-data' }, { status: 400 });
  }

  const form = await req.formData();
  const file = form.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  const bucket = 'parrots';
  // Ensure bucket exists (ignore if exists)
  try { await supabaseAdmin.storage.createBucket(bucket, { public: true }); } catch {}

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const rand = crypto.randomUUID();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `uploads/${yyyy}/${mm}/${rand}-${safeName}`;

  const arrayBuffer = await file.arrayBuffer();
  const { data, error } = await supabaseAdmin.storage.from(bucket).upload(path, new Uint8Array(arrayBuffer), {
    cacheControl: '3600',
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: pub } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: pub.publicUrl, path: data?.path });
}
