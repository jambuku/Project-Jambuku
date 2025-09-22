"use client";
import { motion } from "framer-motion";
import { Trees, ShieldCheck, Leaf } from "lucide-react";

const BRAND = {
  green: "#4CAF50",
  red: "#FF3D3D",
  ink: "#0f172a", // slate-900
};

const items = [
  {
    icon: Trees,
    title: "Akar Lokal yang Kuat",
    desc: "Berawal dari Kampung Gemblakan, kami mengolah jambu air menjadi produk bernilai.",
  },
  {
    icon: ShieldCheck,
    title: "Berkualitas & Terpercaya",
    desc: "Bersertifikat dan didukung kolaborasi pemda, kampus, serta komunitas.",
  },
  {
    icon: Leaf,
    title: "Sustainable Taste",
    desc: "Mengurangi limbah panen lewat inovasi olahan yang berdampak ekonomi positif.",
  },
];

export default function Features() {
  return (
    <section
    id="features"
    className="relative isolate bg-white"
    style={{
        backgroundImage:
        `radial-gradient(800px 400px at 0% 0%, ${BRAND.green}08, transparent),
        radial-gradient(600px 300px at 100% 30%, ${BRAND.red}08, transparent)`,
    }}
    >

      {/* divider halus di atas biar transisi dari hero mulus */}
      <div className="absolute -top-6 left-0 right-0 h-6 rounded-t-[24px] bg-white/60 backdrop-blur" />

      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium text-slate-600 bg-white/70 backdrop-blur">
            Keunggulan
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ color: BRAND.ink }}>
            Keunggulan Jambuku
          </h2>
          <p className="mt-2 text-slate-600">
            Elegan, kredibel, dan berdampak. Ini alasan Jambuku dipercaya klien.
          </p>
        </motion.div>

        {/* cards asimetris (anti-template) */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={[
                "group relative overflow-hidden rounded-3xl border shadow-lg",
                "bg-white/70 backdrop-blur",
                // asimetri: kartu tengah “pop” ke atas, terakhir sedikit ke bawah
                i === 1 ? "md:-mt-6" : "",
                i === 2 ? "md:mt-6" : "",
              ].join(" ")}
              style={{ borderColor: "#e2e8f0" }}
            >
              {/* aksen border gradient halus saat hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    `linear-gradient(120deg, ${BRAND.green}33, transparent 30%, ${BRAND.red}33)`,
                  mask:
                    "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                  WebkitMask:
                    "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                }}
              />

              <div className="relative p-6">
                {/* icon kuat & jelas */}
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-black/5 mb-4"
                  style={{ backgroundColor: `${BRAND.green}1A` }}
                >
                  <f.icon className="h-6 w-6" style={{ color: BRAND.green }} />
                </div>

                <h3 className="text-lg font-semibold"
                    style={{ color: BRAND.ink }}>
                  {f.title}
                </h3>
                <p className="mt-1 text-slate-600">
                  {f.desc}
                </p>
              </div>

              {/* garis aksen bawah (merah) bikin premium */}
              <div
                className="h-1 w-full"
                style={{ background:
                  `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
