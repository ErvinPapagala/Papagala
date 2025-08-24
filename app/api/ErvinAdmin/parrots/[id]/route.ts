import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { guardAdminApi } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;
  const body = await req.json();
  // Only save essential fields that definitely exist in database
  const payload = {
    name: body.name,
    species: body.species,
    age_months: body.age_months,
    price_eur: body.price_eur,
    availability: body.availability,
    cover_image_url: body.cover_image_url ?? null,
    image_urls: Array.isArray(body.image_urls) ? body.image_urls : [],
    // video_urls: Array.isArray(body.video_urls) ? body.video_urls : [], // Temporarily disabled until DB column is added
    description: body.description ?? null,
    training_basic_eur: body.training_basic_eur ?? null,
    training_advanced_eur: body.training_advanced_eur ?? null,
  };
  const { data, error } = await supabaseAdmin.from('parrots').update(payload).eq('id', params.id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;
  const { error } = await supabaseAdmin.from('parrots').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

