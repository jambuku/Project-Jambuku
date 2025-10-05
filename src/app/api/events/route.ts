import { NextResponse } from 'next/server';
import { supabaseServerFromAuthHeader } from '@/lib/supabaseServer';
import { eventCreateSchema } from '@/lib/schemas/event';
import { revalidateTag } from 'next/cache';


// GET /api/events?published=true&search=...&category=uuid&from=2025-01-01&to=2025-12-31&limit=10&offset=0
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const published = url.searchParams.get('published');
    const search = url.searchParams.get('search');
    const category = url.searchParams.get('category');
    const from = url.searchParams.get('from'); // ISO
    const to = url.searchParams.get('to');     // ISO
    const limit = Math.min(Number(url.searchParams.get('limit') ?? 12), 50);
    const offset = Math.max(Number(url.searchParams.get('offset') ?? 0), 0);

    // Client tanpa token = publik → RLS: hanya event published
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    let query = sb.from('events').select('*', { count: 'exact' });

    if (published === 'true') query = query.eq('is_published', true);
    if (published === 'false') query = query.eq('is_published', false);

    if (category) query = query.eq('category_id', category);
    if (from) query = query.gte('start_at', from);
    if (to) query = query.lte('start_at', to);

    if (search) {
      // simple ILIKE di title/description
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    query = query.order('start_at', { ascending: true }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ data, count, limit, offset });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}

// POST /api/events  (butuh Authorization: Bearer <access_token>)
// body: { title, description?, start_at, end_at?, location?, cover_url?, category_id?, is_published? }
export async function POST(req: Request) {
  try {
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    // ambil user dari token (wajib)
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

    const payload = {
      ...parsed.data,
      created_by: userId, // penting: agar lolos policy insert (created_by = auth.uid())
    };

    const { data, error } = await sb.from('events').insert(payload).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    revalidateTag('events'); // <-- ini kuncinya

    return NextResponse.json(data, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
