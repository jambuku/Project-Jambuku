import { NextResponse } from 'next/server';
import { supabaseServerFromAuthHeader } from '@/lib/supabaseServer';
import { revalidateTag } from 'next/cache';
import { eventCreateSchema } from '@/lib/schemas/event';

const eventUpdateSchema = eventCreateSchema.partial();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));
    const { data, error } = await sb.from('events').select('*').eq('id', id).single();

    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    const { data: userRes, error: userErr } = await sb.auth.getUser();
    if (userErr || !userRes?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const json = await req.json();
    const parsed = eventUpdateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 });
    }

    const { data, error } = await sb.from('events').update(parsed.data).eq('id', id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    revalidateTag('events');
    return NextResponse.json({ data, ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    const { data: userRes, error: userErr } = await sb.auth.getUser();
    if (userErr || !userRes?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await sb.from('events').delete().eq('id', id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

    revalidateTag('events');
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
