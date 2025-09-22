"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { WaveTop } from "./SectionDivider";

const BRAND = {
  green: "#4CAF50",
  red: "#FF3D3D",
  ink: "#0f172a",
};

type Prod = {
  name: string;
  desc: string;
  image: string;
  url?: string;
  badge?: "Best Seller" | "Baru" | "Favorit";
  size?: "lg" | "md" | "sm";
};

const products: Prod[] = [
  {
    name: "Sambal Jambu",
    desc: "Pedas segar, pas buat nasi hangat.",
    image:
      "https://images.unsplash.com/photo-1713374989663-e5b165462fef?q=80&w=1170&auto=format&fit=crop",
    url: "#", // TODO: ganti link Tokopedia/Shopee/IG Shop
    badge: "Best Seller",
    size: "lg",
  },
  {
    name: "Dodol Jambu",
    desc: "Manis legit dengan aroma jambu air.",
    image:
      "https://images.unsplash.com/photo-1679493419398-671bc52317e4?q=80&w=687&auto=format",
    url: "#",
    size: "md",
  },
  {
    name: "Selai Jambu",
    desc: "Lembut, cocok untuk roti & pastry.",
    image:
      "https://images.unsplash.com/photo-1615421416673-fa5a539c6ffb?q=80&w=687&auto=format&fit=crop",
    url: "#",
    badge: "Favorit",
    size: "sm",
  },
  {
    name: "Keripik Daun Jambu",
    desc: "Renyah gurih—teman ngemil sehat.",
    image:
      "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?q=80&w=686&auto=format&fit=crop",
    url: "#",
    size: "md",
  },
  {
    name: "Kerupuk Jambu",
    desc: "Inovasi rasa jambu yang unik.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
    url: "#",
    badge: "Baru",
    size: "sm",
  },
];

function cls(...s: (string | false | undefined)[]) {
  return s.filter(Boolean).join(" ");
}

export default function ProductShowcase() {
  return (
    <section
    className="relative isolate bg-white"
    style={{
        backgroundImage: `
        radial-gradient(600px 300px at 0% 0%, #4CAF5014, transparent),
        radial-gradient(600px 300px at 100% 100%, #FF3D3D14, transparent)
        `,
    }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py:28">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ color: BRAND.ink }}>
              Produk Unggulan
            </h2>
            <p className="text-slate-600">
              Rangkaian olahan jambu air yang segar, unik, dan berkualitas.
            </p>
          </div>
          <a
            href="#"
            aria-label="Kunjungi toko"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white shadow-sm hover:shadow-md"
            style={{ backgroundColor: BRAND.green }}
          >
            Kunjungi Toko <ShoppingBag className="h-4 w-4" />
          </a>
        </div>

        {/* Grid masonry-lite */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={cls(
                "group relative overflow-hidden rounded-3xl border bg-white shadow-md hover:shadow-lg transition-shadow",
                // masonry feel: variasi tinggi gambar
                p.size === "lg" && "lg:col-span-2",
              )}
            >
              <div className={cls(
                "relative overflow-hidden",
                p.size === "lg" ? "aspect-[16/9]" :
                p.size === "md" ? "aspect-[4/3]" : "aspect-[5/6]"
              )}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                {/* Overlay hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-80" />
                {/* Badge */}
                {p.badge && (
                  <div
                    className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white shadow"
                    style={{ backgroundColor: BRAND.red }}
                  >
                    <Star className="h-3.5 w-3.5" /> {p.badge}
                  </div>
                )}
              </div>

              <div className="relative p-4">
                <h3 className="text-base sm:text-lg font-semibold"
                    style={{ color: BRAND.ink }}>
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{p.desc}</p>

                <div className="mt-3 flex items-center justify-between">
                  <a
                    href={p.url || "#"}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-50"
                    aria-label={`Beli ${p.name}`}
                  >
                    <ShoppingBag className="h-4 w-4" /> Beli / Info
                  </a>

                  {/* garis aksen halus */}
                  <div
                    className="h-1 w-20 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }}
                    aria-hidden
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <WaveTop />
    </section>
  );
}
