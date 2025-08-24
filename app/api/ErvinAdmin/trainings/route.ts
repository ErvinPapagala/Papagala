import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { guardAdminApi } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const guard = await guardAdminApi(req);
  if (guard) return guard;
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('trainings').insert({ title: body.title, description: body.description || null, price_eur: body.price_eur }).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

