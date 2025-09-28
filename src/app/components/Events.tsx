"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, CalendarX2 } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

type EventItem = {
  date: string;
  title: string;
  location: string;
  desc: string;
  banner?: string;
  ctaText?: string;
  ctaUrl?: string;
};

const events: EventItem[] = [
  { date: "2025-09-09", title: "Pelatihan Photography", location: "Yogyakarta",
    desc: "Praktik foto produk pakai HP: komposisi, lighting, styling, dan edit cepat.",
    banner: "images/bernard.jpg",
    ctaText: "Daftar", ctaUrl: "#" },
  { date: "2025-09-09", title: "Pelatihan Branding", location: "Yogyakarta",
    desc: "Dasar branding UMKM: positioning, identitas visual, dan penerapan ke kemasan/konten.",
    banner: "images/feri.jpg",
    ctaText: "Daftar", ctaUrl: "#" },
];

function formatDate(d: string) {
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return d; }
}
const startOfToday = () => {
  const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate());
};

export default function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const { upcoming, past } = useMemo(() => {
    const today = startOfToday().getTime();
    const upcoming = events
      .filter(e => new Date(e.date).getTime() >= today)
      .sort((a,b) => +new Date(a.date) - +new Date(b.date));
    const past = events
      .filter(e => new Date(e.date).getTime() < today)
      .sort((a,b) => +new Date(b.date) - +new Date(a.date));
    return { upcoming, past };
  }, []);

  const list = tab === "upcoming" ? upcoming : past;

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
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: BRAND.ink }}>
              Event & Kegiatan
            </h2>
            <p className="text-slate-600">Aktivitas terbaru Jambuku. Ikut gabung bareng kami!</p>
          </div>

          {/* Segmented buttons */}
          <div
            role="tablist"
            aria-label="Filter event"
            className="inline-flex items-center rounded-full border bg-white/70 backdrop-blur shadow-sm"
          >
            <button
              role="tab"
              aria-selected={tab === "upcoming"}
              onClick={() => setTab("upcoming")}
              className={[
                "px-4 py-2 text-sm font-medium rounded-full transition",
                tab === "upcoming"
                  ? "text-white"
                  : "text-slate-700 hover:bg-slate-50"
              ].join(" ")}
              style={tab === "upcoming" ? { backgroundColor: BRAND.green } : {}}
            >
              Mendatang
              <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-black/5 px-1 text-[11px] text-slate-800">
                {upcoming.length}
              </span>
            </button>
            <button
              role="tab"
              aria-selected={tab === "past"}
              onClick={() => setTab("past")}
              className={[
                "px-4 py-2 text-sm font-medium rounded-full transition",
                tab === "past"
                  ? "text-white"
                  : "text-slate-700 hover:bg-slate-50"
              ].join(" ")}
              style={tab === "past" ? { backgroundColor: BRAND.red } : {}}
            >
              Terlewat
              <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-black/5 px-1 text-[11px] text-slate-800">
                {past.length}
              </span>
            </button>
          </div>
        </div>

        {/* List / Empty state */}
        {tab === "upcoming" && upcoming.length === 0 ? (
          <div className="mt-8 rounded-3xl border bg-white/80 backdrop-blur p-8 text-center text-slate-600">
            <div className="mx-auto grid place-items-center h-12 w-12 rounded-full border mb-3">
              <CalendarX2 className="h-6 w-6" />
            </div>
            <div className="text-base font-medium text-slate-800">Tidak ada event dalam waktu dekat</div>
            <p className="text-sm">Pantau halaman ini untuk info berikutnya, ya!</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((e, i) => (
              <motion.article
                key={e.title + e.date}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={[
                  "overflow-hidden rounded-3xl border backdrop-blur transition-shadow",
                  tab === "upcoming"
                    ? "bg-white/80 shadow-md hover:shadow-lg"
                    : "bg-white/70 shadow-sm hover:shadow-md"
                ].join(" ")}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={e.banner}
                    alt={e.title}
                    className={[
                      "h-full w-full object-cover transition",
                      tab === "past" ? "grayscale" : ""
                    ].join(" ")}
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-800 shadow">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(e.date)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">{e.title}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="h-3.5 w-3.5" /> {e.location}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{e.desc}</p>
                  {tab === "upcoming" && e.ctaUrl && (
                    <a
                      href={e.ctaUrl}
                      className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white shadow"
                      style={{ backgroundColor: BRAND.red }}
                    >
                      {e.ctaText || "Detail"} <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }}
                />
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
