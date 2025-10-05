// src/app/api/events/[id]/route.ts
import { NextResponse } from 'next/server';
import { supabaseServerFromAuthHeader } from '@/lib/supabaseServer';
import { revalidateTag } from 'next/cache';
// kalau kamu sudah punya schema update, pakai itu.
// contoh: eventUpdateSchema = eventCreateSchema.partial()
import { eventCreateSchema } from '@/lib/schemas/event';

// bikin schema update sederhana kalau belum ada:
const eventUpdateSchema = eventCreateSchema.partial();

type Ctx = { params: { id: string } };

export async function GET(req: Request, { params }: Ctx) {
  try {
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));
    const { data, error } = await sb
      .from('events')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    // pastikan user login
    const { data: userRes, error: userErr } = await sb.auth.getUser();
    if (userErr || !userRes?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const parsed = eventUpdateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const { data, error } = await sb
      .from('events')
      .update(parsed.data)
      .eq('id', params.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    revalidateTag('events');
    return NextResponse.json({ data, ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  try {
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    // opsional: pastikan user login (kalau RLS sudah cukup, bagian ini bisa di-skip)
    const { data: userRes, error: userErr } = await sb.auth.getUser();
    if (userErr || !userRes?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await sb.from('events').delete().eq('id', params.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

    revalidateTag('events');
    // PENTING: selalu kirim JSON, jangan 204 tanpa body
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
