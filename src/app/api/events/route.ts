import { NextResponse } from 'next/server';
import { supabaseServerFromAuthHeader } from '@/lib/supabaseServer';
import { eventCreateSchema } from '@/lib/schemas/event';
import { revalidateTag } from 'next/cache';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const published = url.searchParams.get('published');
    const search = url.searchParams.get('search');
    const category = url.searchParams.get('category');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const limit = Math.min(Number(url.searchParams.get('limit') ?? 12), 50);
    const offset = Math.max(Number(url.searchParams.get('offset') ?? 0), 0);

    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));
    let query = sb.from('events').select('*', { count: 'exact' });

    if (published === 'true') query = query.eq('is_published', true);
    if (published === 'false') query = query.eq('is_published', false);
    if (category) query = query.eq('category_id', category);
    if (from) query = query.gte('start_at', from);
    if (to) query = query.lte('start_at', to);
    if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);

    query = query.order('start_at', { ascending: true }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ data, count, limit, offset });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    const { data: userRes, error: userErr } = await sb.auth.getUser();
    if (userErr || !userRes?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = userRes.user.id;

    const json = await req.json();
    const parsed = eventCreateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 });
    }

    const payload = { ...parsed.data, created_by: userId };
    const { data, error } = await sb.from('events').insert(payload).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // revalidate daftar event
    revalidateTag('events');

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
