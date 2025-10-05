"use client";

import { motion } from "framer-motion";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

export type EventRow = {
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

function fmtDate(s: string) {
  try {
    return new Date(s).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return s;
  }
}

export default function Events({ events = [] as EventRow[] }) {
  const has = events.length > 0;

  return (
    <section
      id="events"
      className="relative isolate bg-white"
      style={{
        backgroundImage: `
          radial-gradient(600px 300px at 0% 0%, ${BRAND.green}10, transparent),
          radial-gradient(600px 300px at 100% 100%, ${BRAND.red}10, transparent)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Event Jambuku
          </h2>
          <p className="mt-1 text-slate-700">
            Aktivitas terbaru Jambuku. Ikut gabung bareng kami!
          </p>
        </motion.div>

        {!has ? (
          // EMPTY STATE – kontras ditingkatkan
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white shadow-sm p-10 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center ring-1 ring-emerald-300">
              <svg width="36" height="36" viewBox="0 0 24 24" className="text-emerald-700" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Belum ada event</h3>
            <p className="mt-1 text-slate-700">
              Pantau halaman ini untuk info berikutnya, ya!
            </p>
            <div className="mt-5">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-emerald-300 text-emerald-800 bg-white hover:bg-emerald-50 transition"
              >
                Hubungi kami
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
                  <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        ) : (
          // LIST – judul/teks lebih gelap, badge tanggal lebih jelas
          <div className="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-slate-300 transition"
              >
                <a href={`/events/${e.slug}`} className="block relative">
                  {e.cover_url ? (
                    <img
                      src={e.cover_url}
                      alt={e.title}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="h-44 w-full"
                      style={{ background: `linear-gradient(135deg, ${BRAND.green}22, ${BRAND.red}22)` }}
                    />
                  )}
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-medium shadow ring-1 ring-slate-300 text-slate-800">
                    {fmtDate(e.start_at)}
                  </div>
                </a>

                <div className="p-5">
                  <h3 className="font-semibold text-slate-900">
                    <a href={`/events/${e.slug}`} className="hover:underline">
                      {e.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-slate-700">
                    {e.location ? e.location : <span className="opacity-80">Lokasi menyusul</span>}
                  </p>
                  {e.description ? (
                    <p className="mt-3 text-sm text-slate-800 line-clamp-3">
                      {e.description}
                    </p>
                  ) : null}

                  <div className="mt-4">
                    <a
                      href={`/events/${e.slug}`}
                      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-slate-300 text-slate-800 hover:bg-slate-50 transition"
                    >
                      Lihat detail
                      <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
                        <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
