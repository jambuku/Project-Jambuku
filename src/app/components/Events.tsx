"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

type EventItem = {
  date: string; // ISO string atau label pendek
  title: string;
  location: string;
  desc: string;
  banner?: string;
  ctaText?: string;
  ctaUrl?: string;
};

const events: EventItem[] = [
  {
    date: "2025-09-22",
    title: "Festival Olahan Jambu",
    location: "Yogyakarta",
    desc: "Demo masak & cicip produk, terbuka untuk umum.",
    banner: "https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Daftar",
    ctaUrl: "#",
  },
  {
    date: "2025-09-30",
    title: "Workshop UMKM",
    location: "Balai RW Gemblakan Atas",
    desc: "Pelatihan branding & pengemasan produk.",
    banner: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Info",
    ctaUrl: "#",
  },
  {
    date: "2025-10-12",
    title: "Open House Jambuku",
    location: "Kampung Gemblakan",
    desc: "Tur kebun jambu & proses produksi.",
    banner: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1600&auto=format&fit=crop",
    ctaText: "Gabung",
    ctaUrl: "#",
  },
];

function formatDate(d: string) {
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

export default function Events() {
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
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="overflow-hidden rounded-3xl border bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={e.banner} alt={e.title} className="h-full w-full object-cover" />
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
                {e.ctaUrl && (
                  <a
                    href={e.ctaUrl}
                    className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white shadow"
                    style={{ backgroundColor: BRAND.red }}
                  >
                    {e.ctaText || "Detail"} <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
