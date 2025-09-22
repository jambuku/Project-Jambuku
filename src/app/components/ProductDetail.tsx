"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

type Item = {
  name: string;
  desc: string;
  img: string;
  url?: string;
  badge?: "Best Seller" | "Favorit" | "Baru";
  tag?: "Sambal" | "Manis" | "Snack";
};

const catalog: Item[] = [
  {
    name: "Sambal Jambu",
    desc: "Perpaduan pedas cabai & segar jambu air, favorit pelanggan.",
    img: "https://images.unsplash.com/photo-1713374989663-e5b165462fef?q=80&w=1170&auto=format&fit=crop",
    url: "#",
    badge: "Best Seller",
    tag: "Sambal",
  },
  {
    name: "Dodol Jambu",
    desc: "Camilan manis legit dengan cita rasa khas jambu.",
    img: "https://images.unsplash.com/photo-1679493419398-671bc52317e4?q=80&w=687&auto=format",
    url: "#",
    tag: "Manis",
  },
  {
    name: "Selai Jambu",
    desc: "Lembut, manis, cocok untuk roti & pastry.",
    img: "https://images.unsplash.com/photo-1615421416673-fa5a539c6ffb?q=80&w=687&auto=format&fit=crop",
    url: "#",
    badge: "Favorit",
    tag: "Manis",
  },
  {
    name: "Keripik Jambu",
    desc: "Renyah gurih, inovasi olahan unik dari daun jambu.",
    img: "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?q=80&w=686&auto=format&fit=crop",
    url: "#",
    tag: "Snack",
  },
];

// util kelas
const cn = (...x: (string | false | undefined)[]) => x.filter(Boolean).join(" ");

export default function ProductDetail() {
  const [filter, setFilter] = useState<"All" | "Sambal" | "Manis" | "Snack">(
    "All"
  );
  const filtered =
    filter === "All" ? catalog : catalog.filter((c) => c.tag === filter);

  // ambil 1 produk unggulan untuk hero kecil
  const featured = catalog[0];
  const others = filtered.filter((p) => p.name !== featured.name);

  return (
    <section
      id="products"
      className="relative isolate bg-white scroll-mt-24"
      style={{
        backgroundImage: `
          radial-gradient(800px 350px at 0% 0%, ${BRAND.green}12, transparent),
          radial-gradient(700px 300px at 100% 100%, ${BRAND.red}10, transparent)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: BRAND.ink }}
            >
              Produk Jambuku
            </h2>
            <p className="text-slate-600">
              Rasa lokal yang dibuat premium. Pilih favoritmu.
            </p>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-2">
            {(["All", "Sambal", "Manis", "Snack"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  filter === key
                    ? "text-white"
                    : "text-slate-800 hover:bg-slate-50"
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

        {/* Featured card */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-8 relative overflow-hidden rounded-[28px] border bg-white shadow-lg"
          style={{
            // border gradient premium
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.02)",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative">
              <img
                src={featured.img}
                alt={featured.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
              {featured.badge && (
                <span
                  className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-white shadow"
                  style={{ backgroundColor: BRAND.red }}
                >
                  <Star className="h-3.5 w-3.5" /> {featured.badge}
                </span>
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-slate-900">
                {featured.name}
              </h3>
              <p className="mt-2 text-slate-600">{featured.desc}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={featured.url || "#"}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white shadow hover:shadow-md transition"
                  style={{ backgroundColor: BRAND.green }}
                >
                  <ShoppingBag className="h-4 w-4" /> Beli / Info
                </a>
                <div
                  className="h-1 rounded-full w-24"
                  style={{
                    background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* border glow tipis */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{
              boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.06), 0 0 0 1px transparent`,
              outline: `2px solid transparent`,
              background:
                `linear-gradient(120deg, ${BRAND.green}33, transparent 30%, ${BRAND.red}33)`,
              mask:
                "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              WebkitMask:
                "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
            }}
          />
        </motion.article>

        {/* Grid lainnya (asimetri premium) */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={cn(
                "relative overflow-hidden rounded-3xl border bg-white shadow-md hover:shadow-lg transition",
                i === 0 && "lg:col-span-2" // satu kartu melebar -> ritme visual
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                )}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                {p.badge && (
                  <span
                    className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white shadow"
                    style={{ backgroundColor: BRAND.red }}
                  >
                    <Star className="h-3.5 w-3.5" /> {p.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {p.name}
                  </h3>
                  {p.tag && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{ borderColor: "#e2e8f0" }}
                    >
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <a
                    href={p.url || "#"}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-50"
                  >
                    <ShoppingBag className="h-4 w-4" /> Beli / Info
                  </a>
                  <div
                    className="h-1 w-20 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})`,
                    }}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
