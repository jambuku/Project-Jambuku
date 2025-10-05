// src/app/admin/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

type EventRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  start_at: string; // ISO
  end_at: string | null;
  location: string | null;
  cover_url: string | null;
  is_published: boolean;
};

// ---- API error type guard (menghindari `any`)
type ApiError = { error: string };
function hasApiError(x: unknown): x is ApiError {
  return !!x && typeof x === 'object' && 'error' in x;
}

async function getAuthHeader(): Promise<Record<string, string>> {
  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;
  const h: Record<string, string> = {};
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

// --- API callers ---
async function apiListEvents() {
  const res = await fetch(`/api/events`);
  return res.json() as Promise<{ data: EventRow[]; count: number }>;
}
async function apiCreateEvent(payload: Partial<EventRow> & { start_at: string }) {
  const auth = await getAuthHeader();
  const headers: HeadersInit = { 'content-type': 'application/json', ...auth };
  const res = await fetch('/api/events', { method: 'POST', headers, body: JSON.stringify(payload) });
  return res.json();
}
async function apiUpdateEvent(id: string, patch: Partial<EventRow>) {
  const auth = await getAuthHeader();
  const headers: HeadersInit = { 'content-type': 'application/json', ...auth };
  const res = await fetch(`/api/events/${id}`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
  return res.json();
}
async function apiDeleteEvent(id: string) {
  const auth = await getAuthHeader();
  const headers: HeadersInit = { ...auth };
  const res = await fetch(`/api/events/${id}`, { method: 'DELETE', headers });
  return res.json();
}
// --- end API callers ---

export default function AdminPage() {
  // auth
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // data
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(false);

  // form create
  const [title, setTitle] = useState('');
  const [startAt, setStartAt] = useState('');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  // UX helpers
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const key = q.toLowerCase().trim();
    if (!key) return events;
    return events.filter((e) =>
      e.title.toLowerCase().includes(key) ||
      (e.location ?? '').toLowerCase().includes(key) ||
      (e.description ?? '').toLowerCase().includes(key)
    );
  }, [q, events]);

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password: pass });
    if (error) return alert(error.message);
    const { data } = await supabaseClient.auth.getUser();
    setUserId(data.user?.id ?? null);
    await loadEvents();
  }
  async function handleLogout() {
    await supabaseClient.auth.signOut();
    setUserId(null);
  }

  async function loadEvents() {
    setLoading(true);
    const res = await apiListEvents();
    setEvents(res.data ?? []);
    setLoading(false);
  }
  useEffect(() => {
    loadEvents();
  }, []);

  async function uploadCover(file: File): Promise<string | null> {
    const { data: session } = await supabaseClient.auth.getSession();
    const uid = session.session?.user.id;
    if (!uid) {
      alert('Session habis, login lagi.');
      return null;
    }
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${uid}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabaseClient.storage
      .from('events')
      .upload(path, file, { upsert: false, cacheControl: '3600', contentType: file.type || undefined });
    if (upErr) {
      alert(`Upload gagal: ${upErr.message}`);
      return null;
    }
    const { data } = supabaseClient.storage.from('events').getPublicUrl(path);
    return data?.publicUrl ?? null;
  }

  async function onCreate() {
    if (!title || !startAt) return alert('Title & Start wajib diisi.');
    setBusy(true);
    const isoStart = new Date(startAt).toISOString();

    let cover_url: string | null = null;
    if (file) {
      cover_url = await uploadCover(file);
      if (!cover_url) {
        setBusy(false);
        return;
      }
    }

    const res = await apiCreateEvent({
      title,
      description: desc || null,
      start_at: isoStart,
      location: location || null,
      is_published: isPublished,
      cover_url,
    });

    if (hasApiError(res)) {
      alert(res.error);
      setBusy(false);
      return;
    }

    // reset
    setTitle('');
    setStartAt('');
    setLocation('');
    setDesc('');
    setIsPublished(false);
    setFile(null);
    setBusy(false);
    await loadEvents();
  }

  async function togglePublish(eid: string, now: boolean) {
    const res = await apiUpdateEvent(eid, { is_published: !now });
    if (hasApiError(res)) {
      alert(res.error);
      return;
    }
    await loadEvents();
  }

  async function remove(eid: string) {
    if (!confirm('Hapus event ini?')) return;
    const res = await apiDeleteEvent(eid);
    if (hasApiError(res)) {
      alert(res.error);
      return;
    }
    await loadEvents();
  }

  // ======================= UI =======================
  if (!userId) {
    return (
      <main className="mx-auto max-w-md p-8 text-slate-900">
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-6">
          <h1 className="text-2xl font-semibold">Masuk Admin</h1>
          <p className="text-sm text-slate-600 mt-1">
            Gunakan akun yang sudah dibuat di <b>Supabase → Authentication → Users</b>.
          </p>
          <form onSubmit={handleLogin} className="space-y-3 mt-5">
            <label className="block">
              <span className="text-sm">Email</span>
              <input
                className="w-full border border-slate-300 rounded-lg p-2 mt-1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm">Password</span>
              <input
                className="w-full border border-slate-300 rounded-lg p-2 mt-1"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </label>
            <button
              className="w-full py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>

        {/* Tutorial mini saat belum login */}
        <div className="mt-8 rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
          <div className="font-medium text-lg flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ?
            </span>
            Tutorial singkat
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm">
            <ol className="list-decimal ml-5 space-y-1">
              <li>Login pakai akun admin.</li>
              <li>
                Isi form <b>Create Event</b>: Judul, Tanggal, (opsional) Lokasi & Deskripsi.
              </li>
              <li>
                Upload <b>Cover</b> (opsional) → klik <b>Save</b>.
              </li>
              <li>
                Gunakan tombol <b>Publish</b>/<b>Unpublish</b>.
              </li>
              <li>Perubahan langsung ter-update di halaman publik.</li>
            </ol>
            <ul className="space-y-1">
              <li>Judul ≤ 80 karakter, deskripsi singkat & informatif.</li>
              <li>Cover ideal 1200×630, JPG/PNG ≤ 1MB.</li>
              <li>Gunakan kolom <b>Search</b> untuk cari event cepat.</li>
            </ul>
          </div>
        </div>
      </main>
    );
  }

  const total = events.length;
  const published = events.filter((e) => e.is_published).length;
  const upcoming = events.filter((e) => new Date(e.start_at) > new Date()).length;

  return (
    <main className="mx-auto max-w-6xl p-8 text-slate-900 space-y-7">
      {/* Header */}
      <header className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Event Admin</h1>
          <p className="text-sm text-slate-600">Kelola event Jambuku: tambah, publikasikan, hapus.</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
        >
          Logout
        </button>
      </header>

      {/* Stats */}
      <section className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Total', value: total },
          { label: 'Published', value: published },
          { label: 'Upcoming', value: upcoming },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5"
          >
            <div className="text-xs uppercase tracking-wide text-slate-600">{c.label}</div>
            <div className="text-3xl font-semibold mt-1">{c.value}</div>
          </div>
        ))}
      </section>

      {/* Tutorial ringkas */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div className="font-medium">Cara pakai (cepat)</div>
          <a href="#create" className="text-sm text-emerald-700 hover:underline">
            Loncat ke form ↓
          </a>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 mt-2 text-sm">
          <ol className="list-decimal ml-5 space-y-1">
            <li>Isi data event, upload cover (opsional), lalu klik <b>Save</b>.</li>
            <li>Gunakan <b>Publish</b> untuk tampilkan ke publik.</li>
            <li>Semua perubahan otomatis refresh di website.</li>
          </ol>
          <ul className="space-y-1">
            <li>Tips: gunakan foto cerah & teks besar pada banner.</li>
            <li>Gunakan <b>Search</b> di tabel untuk cari cepat.</li>
            <li>Hapus event lama agar daftar tetap bersih.</li>
          </ul>
        </div>
      </section>

      {/* Create form */}
      <section
        id="create"
        className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-4"
      >
        <div className="font-medium">Create Event</div>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm">Title</span>
            <input
              className="w-full border border-slate-300 rounded-lg p-2 mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Pelatihan UMKM Jambu"
            />
          </label>
          <label className="block">
            <span className="text-sm">Start time</span>
            <input
              className="w-full border border-slate-300 rounded-lg p-2 mt-1"
              type="datetime-local"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-sm">Location (opsional)</span>
            <input
              className="w-full border border-slate-300 rounded-lg p-2 mt-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Balai RW Gemblakan Atas..."
            />
          </label>
          <label className="block">
            <span className="text-sm">Cover (opsional)</span>
            <input
              className="w-full mt-1"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-slate-600 mt-1">Disarankan 1200×630px, JPG/PNG ≤ 1MB.</p>
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm">Description (opsional)</span>
            <textarea
              className="w-full border border-slate-300 rounded-lg p-2 mt-1 min-h-[96px]"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Ringkasan kegiatan, siapa yang boleh ikut, dsb."
            />
          </label>
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <span>Published</span>
          </label>
          <button
            onClick={onCreate}
            disabled={busy}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </section>

      {/* List + search */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="font-medium">All Events</div>
          <input
            className="border border-slate-300 rounded-lg p-2 w-64"
            placeholder="Search title/location"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left p-3">Event</th>
                <th className="text-left p-3">Schedule</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-600">
                    Tidak ada event. Buat baru di atas.
                  </td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          {e.cover_url ? (
                            // boleh diganti next/image kalau sudah setup
                            <img
                              src={e.cover_url}
                              alt={e.title}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div>
                          <div className="font-medium">{e.title}</div>
                          <div className="text-xs text-slate-600 truncate max-w-[36ch]">
                            {e.description ?? ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      {new Date(e.start_at).toLocaleString('id-ID', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                      {e.location ? (
                        <div className="text-xs text-slate-600">{e.location}</div>
                      ) : null}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${
                          e.is_published
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {e.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <a
                        href={`/events/${e.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg border hover:bg-slate-50"
                      >
                        View
                      </a>
                      <button
                        onClick={() => togglePublish(e.id, e.is_published)}
                        className="px-3 py-1.5 rounded-lg border"
                      >
                        {e.is_published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => remove(e.id)}
                        className="px-3 py-1.5 rounded-lg border text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
