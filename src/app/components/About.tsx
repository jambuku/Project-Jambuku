"use client";
import { motion } from "framer-motion";
import { Leaf, Sparkles, Users, Award } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

export default function About() {
  return (
    <section
      id="about"
      className="relative isolate bg-white scroll-mt-24"
      style={{
        backgroundImage: `
          radial-gradient(700px 320px at 0% 0%, ${BRAND.green}10, transparent),
          radial-gradient(700px 320px at 100% 100%, ${BRAND.red}10, transparent)
        `,
      }}

    >
     {/* aksen warna ekstra, super halus */}
        <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-0 top-1/4 h-[280px] w-[280px] rounded-full blur-3xl opacity-40"
        style={{ background: `radial-gradient(circle at 30% 30%, ${BRAND.green}33, transparent 60%)` }}
        />
        <div
        aria-hidden
        className="pointer-events-none absolute -z-10 right-0 bottom-1/4 h-[260px] w-[260px] rounded-full blur-3xl opacity-40"
        style={{ background: `radial-gradient(circle at 70% 70%, ${BRAND.red}26, transparent 60%)` }}
        />


      {/* dekor garis tipis brand di atas */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{background:`linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})`}} />

      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Collage premium */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* card besar */}
          <div className="relative rounded-[28px] overflow-hidden shadow-xl ring-1 ring-black/5">
            <img
              src="https://images.unsplash.com/photo-1630749608102-cf332d7ea18e?q=80&w=1170&auto=format&fit=crop"
              alt="Jambu air segar"
              className="h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0" />
          </div>

          {/* kartu tumpuk kiri-bawah */}
          <div className="absolute -bottom-8 -left-6 w-[55%] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white">
            <img
              src="https://images.unsplash.com/photo-1661193302679-4bc5740adda1?w=600&auto=format&fit=crop"
              alt="Proses produksi"
              className="h-48 w-full object-cover"
            />
          </div>

          {/* badge kecil kanan-atas */}
          <div className="absolute -top-5 -right-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium text-slate-600 shadow ring-1 ring-black/5 flex items-center gap-2">
            <Sparkles className="h-4 w-4" color={BRAND.green} />
            Sejak 2021
          </div>
        </motion.div>

        {/* RIGHT: Story + stats + quote */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-slate-600 bg-white/70 backdrop-blur">
            <Leaf className="h-4 w-4" color={BRAND.green} />
            Cerita Kami
          </span>

          <h2
            className="mt-3 text-[clamp(24px,3.5vw,38px)] font-semibold tracking-tight"
            style={{ color: BRAND.ink }}
          >
            Jambuku: Rasa Lokal, Kualitas Premium
          </h2>

          <p className="mt-3 text-slate-600 leading-relaxed">
            Berawal dari <b>Kampung Gemblakan</b>, kami mengolah jambu air menjadi produk
            bernilai: sambal, dodol, selai, keripik, dan lebih banyak lagi. Kami menjaga tradisi,
            memperkuat komunitas, dan menghadirkan kualitas yang bisa dipercaya.
          </p>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Visi kami sederhana: Membangun <b>kampung jambu</b> yang maju dan inovatif di tengah Kota Yogyakarta adalah sebuah langkah
            nyata untuk mewujudkan kota yang hijau, lestari, dan sejahtera.
          </p>

          {/* stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-slate-900">7+</div>
              <div className="text-xs text-slate-600">Varian Produk</div>
            </div>
            <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-slate-900">-</div>
              <div className="text-xs text-slate-600">Kolaborasi</div>
            </div>
            <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-slate-900">-</div>
              <div className="text-xs text-slate-600">Penghargaan/Program</div>
            </div>
          </div>

          {/* quote */}
          <figure className="mt-6 rounded-2xl border bg-white/80 backdrop-blur p-5 shadow-sm">
            <blockquote className="italic text-slate-700">
              “Kami percaya inovasi terbaik lahir dari kampung. Tugas kami: membuatnya
              <span className="font-semibold"> terasa premium</span>, tanpa meninggalkan akar.”
            </blockquote>
            <figcaption className="mt-2 text-xs text-slate-500 flex items-center gap-2">
              <Award className="h-4 w-4" /> Tim Jambuku
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
