"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2 } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

const items = [
  { year: "2022", title: "Register Kelembagaan Petani", desc: "Memenuhi syarat kelembagaan petani & pelaku usaha.", icon: ShieldCheck },
  { year: "2023", title: "Kelompok Tani Lanjut", desc: "Pengukuhan kelas kemampuan Kelompok Tani Kota Yogyakarta.", icon: Award },
  { year: "2023", title: "Mitra WMK UGM", desc: "Mitra Program Wirausaha Merdeka UGM.", icon: Building2 },
  { year: "2023", title: "Juara 3 Pra Koperasi", desc: "Penghargaan Disperindakop Kota Yogyakarta.", icon: Award },
  { year: "2025", title: "Juara 3 DIY Kelompok Petani Perempuan", desc: "Menciptakan Ketahanan Pangan Bebas Stigma Daerah DIY.", icon: Award },
];

export default function Trust() {
  return (
    <section
      id="certs"
      className="relative isolate bg-white"
      style={{
        backgroundImage: `
          radial-gradient(600px 300px at 0% 0%, ${BRAND.green}14, transparent),
          radial-gradient(600px 300px at 100% 100%, ${BRAND.red}14, transparent)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium text-slate-600 bg-white/70 backdrop-blur">
            Kredibilitas
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: BRAND.ink }}>
            Sertifikasi & Kolaborasi
          </h2>
          <p className="mt-1 text-slate-600">
            Bukti komitmen Jambuku terhadap kualitas, kepercayaan, dan dampak.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl ring-1 ring-black/5" style={{ backgroundColor: `${BRAND.green}1A` }}>
                    <it.icon className="h-5 w-5" style={{ color: BRAND.green }} />
                  </div>
                  <div className="text-xs font-medium text-slate-600">{it.year}</div>
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{it.title}</h3>
                <p className="text-sm text-slate-600">{it.desc}</p>
              </div>
              {/* Accent bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
