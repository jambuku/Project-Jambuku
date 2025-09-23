"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Star,
  Flame,
  Clock,
  BadgeCheck,
  Utensils,
  Leaf,
  MapPin,
  Tag,
  Scale,
  Crown,
} from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

type Item = {
  name: string;
  desc: string;
  img: string;
  url?: string;
  badge?: "Best Seller" | "Favorit" | "Baru";
  tag?: "Sambal" | "Manis" | "Snack";
  weight?: string;
  heat?: 0 | 1 | 2 | 3;
  shelf?: string;
  ingredients?: string[];
  halal?: "Terverifikasi" | "—";
  serve?: string;
  price?: string;
  origin?: string;
  featured?: boolean; // ✅ tandai unggulan di sini
};

const catalog: Item[] = [
  {
    name: "Kerupuk Jambu Air",
    desc: "Kerupuk gurih dari olahan jambu air pilihan—renyah dan cocok jadi pendamping makan.",
    img: "images/krupuk.jpg",
    url: "#",
    badge: "Favorit",
    tag: "Snack",
    weight: "200 g",
    price: "Rp25.000",
    shelf: "6 bulan",
    ingredients: ["Jambu air", "Tepung", "Bumbu"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Sambal Jambu",
    desc: "Pedas segar—cabai berpadu jambu air dengan sentuhan manis alami.",
    img: "images/Sambaljambu.jpg",
    url: "#",
    badge: "Best Seller",
    tag: "Sambal",
    weight: "150 g",
    price: "Rp15.000",
    shelf: "6 bulan",
    ingredients: ["Jambu air", "Cabai", "Gula", "Garam", "Bawang"],
    heat: 3,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: true, // ✅ unggulan
  },
  {
    name: "Keripik Daun Jambu Air",
    desc: "Cemilan sehat dan unik dari daun jambu—renyah, gurih, kaya antioksidan.",
    img: "images/kripik.jpg",
    url: "#",
    tag: "Snack",
    weight: "150 g",
    price: "Rp15.000",
    shelf: "5 bulan",
    ingredients: ["Daun jambu", "Tepung", "Bumbu"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: true, // ✅ unggulan
  },
  {
    name: "Egg Roll Jambu Air",
    desc: "Egg roll renyah lembut dengan aroma jambu air segar—unik & nagih.",
    img: "",
    url: "#",
    tag: "Snack",
    weight: "200 g",
    price: "Rp25.000",
    shelf: "6 bulan",
    ingredients: ["Tepung", "Telur", "Jambu air", "Gula"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },

  {
    name: "Selai Jambu",
    desc: "Selai lembut—manis & asam alami, cocok untuk roti, pastry, atau yogurt.",
    img: "images/selai.jpg",
    url: "#",
    tag: "Manis",
    weight: "200 g",
    price: "Rp20.000",
    shelf: "10 bulan",
    ingredients: ["Jambu air", "Gula", "Pektin", "Lemon"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: true, // ✅ unggulan
  },
  {
    name: "Dodol Jambu Air",
    desc: "Dodol lembut dan kenyal dengan rasa jambu tropis yang khas.",
    img: "images/dodol.jpg",
    url: "#",
    tag: "Manis",
    weight: "150 g",
    price: "Rp15.000",
    shelf: "8 bulan",
    ingredients: ["Jambu air", "Gula", "Santan", "Tepung"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Stick Jambu Air",
    desc: "Kriuk ringan dengan rasa khas jambu—teman ngemil seru.",
    img: "",
    url: "#",
    tag: "Snack",
    weight: "150 g",
    price: "Rp15.000",
    shelf: "6 bulan",
    ingredients: ["Jambu air", "Tepung", "Bumbu"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Teh Daun Jambu",
    desc: "Teh herbal dari daun jambu kering—kaya antioksidan, baik untuk pencernaan.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "10 g",
    price: "Rp5.000",
    shelf: "12 bulan",
    ingredients: ["Daun jambu kering"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },

  {
    name: "Setup Jambu Air",
    desc: "Minuman segar jambu air—paling nikmat disajikan dingin.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "350 ml",
    price: "Rp20.000",
    shelf: "7 hari (chiller)",
    ingredients: ["Jambu air", "Gula", "Air", "Lemon"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Sirup Jambu Air",
    desc: "Sirup manis segar dari jambu—tanpa bahan tambahan buatan.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "350 ml",
    price: "Rp7.000",
    shelf: "6 bulan (belum dibuka)",
    ingredients: ["Jambu air", "Gula", "Air"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Sari Jambu Air",
    desc: "Sari buah jambu—manis-asam seimbang, kaya vitamin.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "350 ml",
    price: "Rp8.000",
    shelf: "7 hari (chiller)",
    ingredients: ["Jambu air", "Gula", "Air"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Manisan Jambu",
    desc: "Manis-asam segar—camilan renyah yang bikin nagih.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "150 g",
    price: "Rp12.000",
    shelf: "4 bulan",
    ingredients: ["Jambu air", "Gula", "Asam", "Garam"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },

  {
    name: "Jambu Rasa Kurma",
    desc: "Perpaduan unik—jambu dengan sensasi manis khas kurma.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "150 g",
    price: "Rp15.000",
    shelf: "4 bulan",
    ingredients: ["Jambu air", "Gula", "Ekstrak kurma"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Yupi Jambu Air",
    desc: "Permen kenyal rasa jambu—manis & menyegarkan.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "75 g",
    price: "Rp10.000",
    shelf: "10 bulan",
    ingredients: ["Gula", "Gelatin", "Jambu air", "Perisa"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Puding Jambu Air",
    desc: "Dessert lembut rasa jambu—segar, manis pas.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "75 g",
    price: "Rp5.000",
    shelf: "3 hari (chiller)",
    ingredients: ["Jambu air", "Susu/Santan", "Gula", "Agar"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Es Dawet Jambu Air",
    desc: "Dawet kenyal berpadu jambu—santan gurih & gula merah manis.",
    img: "",
    url: "#",
    tag: "Manis",
    weight: "Cup",
    price: "Rp5.000",
    shelf: "Sajikan segar",
    ingredients: ["Jambu air", "Santan", "Gula merah", "Cendol"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },

  {
    name: "Apem Jambu Air",
    desc: "Kue tradisional empuk dengan sentuhan aroma jambu.",
    img: "",
    url: "#",
    tag: "Snack",
    weight: "Pouch",
    price: "Rp15.000",
    shelf: "3 hari (fresh)",
    ingredients: ["Tepung", "Jambu air", "Gula", "Ragi"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Bakso Jambuku",
    desc: "Bakso kenyal dengan sentuhan jambu—gurih unik & segar.",
    img: "",
    url: "#",
    tag: "Snack",
    weight: "Biji",
    price: "Rp3.000",
    shelf: "Frozen 1 bulan",
    ingredients: ["Daging", "Jambu air", "Bumbu"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Nugget & Lumpia Jambu",
    desc: "Gurih renyah—inovasi nugget & lumpia dengan sentuhan jambu.",
    img: "",
    url: "#",
    tag: "Snack",
    weight: "125 g",
    price: "Rp25.000",
    shelf: "Frozen 1 bulan",
    ingredients: ["Daging/Sayur", "Jambu air", "Tepung", "Bumbu"],
    heat: 0,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
  {
    name: "Saus Jambu Air",
    desc: "Saus serbaguna—manis, asam, ada sentuhan segar jambu.",
    img: "",
    url: "#",
    tag: "Sambal",
    weight: "Toples",
    price: "Rp25.000",
    shelf: "6 bulan",
    ingredients: ["Jambu air", "Gula", "Cuka", "Rempah"],
    heat: 1,
    halal: "Terverifikasi",
    origin: "Gemblakan, Yogyakarta",
    featured: false,
  },
];

const cn = (...x: (string | false | undefined)[]) => x.filter(Boolean).join(" ");

function HeatDots({ level = 0 }: { level?: 0 | 1 | 2 | 3 }) {
  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "inline-block h-2 w-2 rounded-full",
            i < level ? "bg-red-500" : "bg-red-200"
          )}
        />
      ))}
    </div>
  );
}

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='rgba(76,175,80,0.20)'/>
        <stop offset='100%' stop-color='rgba(255,61,61,0.20)'/>
      </linearGradient></defs>
      <rect width='1200' height='900' fill='url(#g)'/>
    </svg>`
  );

export default function ProductDetail() {
  const [filter, setFilter] = useState<"All" | "Unggulan" | "Sambal" | "Manis" | "Snack">("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const STEP = 3;
  const INITIAL = 3;
  const [visible, setVisible] = useState(INITIAL);

  // urutkan: featured dulu, lalu yang lain
  const sorted = useMemo(
    () =>
      [...catalog].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
    []
  );

  const filtered = useMemo(() => {
    if (filter === "Unggulan") return sorted.filter((c) => c.featured);
    if (filter === "All") return sorted;
    return sorted.filter((c) => c.tag === filter);
  }, [filter, sorted]);

  // spotlight ambil featured pertama; kalau ga ada, ambil item pertama
  const spotlight = filtered.find((i) => i.featured) ?? filtered[0];
  const othersAll = filtered.filter((i) => i !== spotlight);
  const others = useMemo(() => othersAll.slice(0, visible), [othersAll, visible]);
  const canLoadMore = visible < othersAll.length;

  useEffect(() => {
    setVisible(INITIAL);
    setExpanded(null);
  }, [filter]);

  const imgOr = (src?: string) => (src && src.trim() ? src : PLACEHOLDER);

  return (
    <section
      id="products"
      className="relative isolate bg-white scroll-mt-24"
      style={{
        backgroundImage: `
          radial-gradient(800px 320px at 0% 0%, ${BRAND.green}12, transparent),
          radial-gradient(700px 300px at 100% 100%, ${BRAND.red}10, transparent)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-14 sm:py-18 lg:py-24">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: BRAND.ink }}
            >
              Produk Jambuku
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Rasa lokal yang dibuat premium. Dengan komposisi jelas, umur simpan, dan saran saji.
            </p>
          </div>

          {/* Filter chips + Unggulan */}
          <div className="flex flex-wrap items-center gap-2">
            {(["All", "Unggulan", "Sambal", "Manis", "Snack"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs sm:text-sm transition",
                  filter === key ? "text-white" : "text-slate-800 hover:bg-slate-50"
                )}
                style={
                  filter === key
                    ? { background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }
                    : {}
                }
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight (beda gaya) */}
        {spotlight && (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="mt-6 relative overflow-hidden rounded-3xl border bg-white/90 backdrop-blur shadow-md ring-1 ring-black/5"
          >
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              <div className="relative max-h-[360px]">
                <img
                  src={imgOr(spotlight.img)}
                  alt={spotlight.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />

                {/* Halal badge */}
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[11px] font-medium border border-emerald-200 shadow-sm">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Halal: Terverifikasi
                </span>

                {/* Spotlight badge */}
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow ring-1 ring-black/5">
                  <Crown className="h-3.5 w-3.5" color={BRAND.red} />
                  Unggulan
                </span>

                {spotlight.badge && (
                  <span
                    className="absolute left-4 bottom-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-white shadow"
                    style={{ backgroundColor: BRAND.red }}
                  >
                    <Star className="h-3.5 w-3.5" /> {spotlight.badge}
                  </span>
                )}
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-slate-900">{spotlight.name}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{spotlight.desc}</p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  {spotlight.weight && (
                    <div className="inline-flex items-center gap-1.5">
                      <Scale className="h-3.5 w-3.5" />
                      {spotlight.weight}
                    </div>
                  )}
                  {spotlight.shelf && (
                    <div className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {spotlight.shelf}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5" />
                    <HeatDots level={spotlight.heat ?? 0} />
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    {spotlight.price ?? "—"}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={spotlight.url || "#"}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white shadow hover:shadow-md transition text-sm"
                    style={{ backgroundColor: BRAND.green }}
                  >
                    <ShoppingBag className="h-4 w-4" /> Beli / Info
                  </a>
                </div>

                <button
                  onClick={() =>
                    setExpanded(expanded === spotlight.name ? null : spotlight.name)
                  }
                  className="mt-3 text-xs text-emerald-700 hover:underline self-start"
                >
                  {expanded === spotlight.name ? "Tutup detail" : "Lihat detail"}
                </button>

                {expanded === spotlight.name && (
                  <div className="mt-2 grid gap-2 text-xs text-slate-600">
                    {spotlight.ingredients?.length ? (
                      <div className="inline-flex items-start gap-2">
                        <Leaf className="mt-0.5 h-3.5 w-3.5" />
                        <span>Komposisi: {spotlight.ingredients.join(", ")}</span>
                      </div>
                    ) : null}
                    {spotlight.serve && (
                      <div className="inline-flex items-start gap-2">
                        <Utensils className="mt-0.5 h-3.5 w-3.5" />
                        <span>Saran saji: {spotlight.serve}</span>
                      </div>
                    )}
                    <div className="inline-flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5" />
                      <span>Asal: {spotlight.origin || "—"}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        )}

        {/* Grid lainnya (unggulan tampil beda) */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={cn(
                "relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition",
                p.featured &&
                  "ring-2 ring-emerald-400/70 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              )}
              style={
                p.featured
                  ? {
                      background:
                        "linear-gradient(180deg, rgba(76,175,80,0.06), rgba(255,61,61,0.03))",
                    }
                  : {}
              }
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={imgOr(p.img)}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Halal */}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[11px] font-medium border border-emerald-200 shadow-sm">
                  <BadgeCheck className="h-3 w-3" />
                  Halal: Terverifikasi
                </span>

                {/* Badge unggulan / produk */}
                {p.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-slate-700 shadow ring-1 ring-black/5">
                    <Crown className="h-3 w-3" color={BRAND.red} />
                    Unggulan
                  </span>
                )}
                {p.badge && (
                  <span
                    className="absolute left-3 bottom-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-white shadow"
                    style={{ backgroundColor: BRAND.red }}
                  >
                    <Star className="h-3 w-3" /> {p.badge}
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">
                    {p.name}
                  </h3>
                  {p.tag && (
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full border text-slate-700">
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[13px] text-slate-600">{p.desc}</p>

                {/* spec kecil */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  {p.weight && (
                    <div className="inline-flex items-center gap-1.5">
                      <Scale className="h-3.5 w-3.5" />
                      {p.weight}
                    </div>
                  )}
                  {p.shelf && (
                    <div className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {p.shelf}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5" />
                    <HeatDots level={p.heat ?? 0} />
                  </div>
                  {p.price && (
                    <div className="inline-flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" />
                      {p.price}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <a
                    href={p.url || "#"}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] text-slate-900 hover:bg-slate-50"
                  >
                    <ShoppingBag className="h-4 w-4" /> Beli / Info
                  </a>
                  <button
                    onClick={() => setExpanded(expanded === p.name ? null : p.name)}
                    className="text-[12px] text-emerald-700 hover:underline"
                  >
                    {expanded === p.name ? "Tutup" : "Detail"}
                  </button>
                </div>

                {expanded === p.name && (
                  <div className="mt-2 grid gap-2 text-[12px] text-slate-600">
                    {p.ingredients?.length ? (
                      <div className="inline-flex items-start gap-2">
                        <Leaf className="mt-0.5 h-3.5 w-3.5" />
                        <span>Komposisi: {p.ingredients.join(", ")}</span>
                      </div>
                    ) : null}
                    {p.serve && (
                      <div className="inline-flex items-start gap-2">
                        <Utensils className="mt-0.5 h-3.5 w-3.5" />
                        <span>Saran saji: {p.serve}</span>
                      </div>
                    )}
                    <div className="inline-flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5" />
                      <span>Asal: {p.origin || "—"}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {canLoadMore && (
          <div className="mt-8 grid place-items-center">
            <button
              onClick={() => setVisible((v) => Math.min(v + STEP, othersAll.length))}
              className="
                inline-flex items-center justify-center gap-2
                rounded-full px-4 py-2 text-sm font-medium text-white
                bg-gradient-to-r from-emerald-500 to-red-500
                shadow-sm hover:shadow-md active:scale-[0.99]
                focus:outline-none focus:ring-2 focus:ring-emerald-300/70
              "
              aria-label="Muat 3 produk lagi"
            >
              Muat lagi ({others.length}/{othersAll.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
