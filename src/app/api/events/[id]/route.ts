import { NextResponse } from 'next/server';
import { supabaseServerFromAuthHeader } from '@/lib/supabaseServer';
import { eventUpdateSchema } from '@/lib/schemas/event';
import { revalidateTag } from 'next/cache';

type Ctx = { params: { id: string } };

export async function GET(req: Request, { params }: Ctx) {
  try {
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    const { data, error } = await sb
      .from('events')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    // wajib: user harus login (RLS juga akan ngecek owner)
    const { data: userRes, error: userErr } = await sb.auth.getUser();
    if (userErr || !userRes?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = eventUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    // Update dan minta row balik—kalau tidak ketemu, error 404
    const { data, error } = await sb
      .from('events')
      .update(parsed.data)
      .eq('id', params.id)
      .select('*')
      .single();

    if (error) {
      // Supabase akan kasih error saat single() tidak ketemu
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    // ✅ invalidate cache halaman yang tag-nya 'events'
    revalidateTag('events');

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  try {
    const sb = supabaseServerFromAuthHeader(req.headers.get('authorization'));

    // wajib: user harus login (RLS juga akan ngecek owner)
    const { data: userRes, error: userErr } = await sb.auth.getUser();
    if (userErr || !userRes?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Supabase delete bisa pakai select() untuk dapat row balik—biar bisa bedain 404 vs sukses
    const { data, error } = await sb
      .from('events')
      .delete()
      .eq('id', params.id)
      .select('id')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    // ✅ invalidate cache
    revalidateTag('events');

    // 200 OK + info minimal
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
