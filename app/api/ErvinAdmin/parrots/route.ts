import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { guardAdminApi } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;

  const body = await req.json();
  const payload = {
    name: body.name,
    species: body.species,
    age_months: body.age_months ?? 0,
    price_eur: body.price_eur ?? 0,
    availability: body.availability || 'available',
    cover_image_url: body.cover_image_url || null,
    image_urls: Array.isArray(body.image_urls) ? body.image_urls : [],
    description: body.description || null,
    training_basic_eur: body.training_basic_eur ?? null,
    training_advanced_eur: body.training_advanced_eur ?? null,
  };
  const { data, error } = await supabaseAdmin.from('parrots').insert(payload).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

