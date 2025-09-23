"use client";

import { motion } from "framer-motion";
import { Crown, ShoppingBag, ShieldCheck, Star } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

type Featured = {
  name: string;
  tagline: string;
  desc: string;
  image: string;
  url?: string;
  rating?: number; // 0 - 5 (opsional)
};

const featured: Featured[] = [
  {
    name: "Sambal Jambu Signature",
    tagline: "Pedas segar khas Gemblakan",
    desc:
      "Rasa pedas buah jambu yang bersih dan wangi—pas untuk lauk rumahan maupun restoran.",
    image:
      "https://images.unsplash.com/photo-1604908554007-0775322b737f?q=80&w=1600&auto=format&fit=crop",
    url: "#",
    rating: 4.9,
  },
  {
    name: "Dodol Jambu Gula Merah",
    tagline: "Legit, lembut, premium",
    desc:
      "Tekstur chewy lembut dengan aroma jambu air. Cocok jadi hantaran dan suguhan acara.",
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1600&auto=format&fit=crop",
    url: "#",
    rating: 4.8,
  },
  {
    name: "Keripik Daun Jambu",
    tagline: "Renyah gurih, light snack",
    desc:
      "Daun jambu yang diolah renyah—unik, ringan, dan nagih. Teman minum teh favorit.",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1600&auto=format&fit=crop",
    url: "#",
    rating: 4.7,
  },
];

export default function FeaturedProducts() {
  return (
    <section
      id="featured"
      className="relative isolate bg-white"
      style={{
        backgroundImage: `
          radial-gradient(700px 320px at 0% 10%, ${BRAND.green}10, transparent),
          radial-gradient(700px 320px at 100% 90%, ${BRAND.red}10, transparent)
        `,
      }}
    >
      {/* border gradient tipis atas */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
        {/* Head */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-slate-600 bg-white/70 backdrop-blur">
            <Crown className="h-4 w-4" color={BRAND.green} />
            Produk Unggulan
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight"
            style={{ color: BRAND.ink }}
          >
            Pilihan Premium Jambuku
          </h2>
          <p className="mt-1 text-slate-600">
            Tiga produk istimewa yang paling dicari—rasa premium, kualitas terjaga.
          </p>
        </motion.div>

        {/* Grid editorial: 1 besar + 2 stack */}
        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {/* Spotlight besar (kolom 2 lebar) */}
          <FeaturedCard item={featured[0]} large />

          {/* Dua pendamping (stack) */}
          <div className="grid gap-6">
            <FeaturedCard item={featured[1]} />
            <FeaturedCard item={featured[2]} />
          </div>
        </div>

        {/* CTA bar kecil */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-slate-900 hover:bg-slate-50"
          >
            <ShoppingBag className="h-4 w-4" /> Lihat Semua Produk
          </a>
        </div>
      </div>
    </section>
  );
}

function Stars({ value = 0 }: { value?: number }) {
  // tampilkan 5 bintang, setengah jika perlu (anggap .5 dibulatkan ke bawah visual)
  const full = Math.floor(value);
  const rest = value - full;
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < full ? "fill-current" : "opacity-30"}`}
        />
      ))}
      <span className="ml-1 text-[11px] text-slate-600">{value.toFixed(1)}</span>
    </div>
  );
}

function FeaturedCard({ item, large = false }: { item: Featured; large?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={[
        "group relative overflow-hidden rounded-3xl border bg-white/80 backdrop-blur shadow-md hover:shadow-xl hover:-translate-y-1 transition-all",
        large ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      {/* media */}
      <div className={large ? "relative aspect-[21/9]" : "relative aspect-[16/10]"}>
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* overlay gradient bawah utk teks */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        {/* badge halal */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[11px] font-medium border border-emerald-200 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          Halal: Terverifikasi
        </div>
        {/* crown kecil */}
        {large && (
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow ring-1 ring-black/5 inline-flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5" color={BRAND.red} />
            Spotlight
          </div>
        )}
      </div>

      {/* content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              {item.name}
            </h3>
            <div className="text-sm text-slate-600">{item.tagline}</div>
          </div>
          {item.rating ? <Stars value={item.rating} /> : null}
        </div>

        <p className="mt-2 text-sm text-slate-600 max-w-2xl">{item.desc}</p>

        <div className="mt-4 flex items-center justify-between">
          <a
            href={item.url || "#"}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-50"
          >
            <ShoppingBag className="h-4 w-4" />
            Beli / Info
          </a>
          <div
            className="h-1 w-20 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})`,
            }}
            aria-hidden
          />
        </div>
      </div>
    </motion.article>
  );
}
