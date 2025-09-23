"use client";
import { motion } from "framer-motion";
import PeloporCard from "./PeloporCard";
import { Leaf, Sparkles, Award, Target, Eye, Heart, BadgeCheck, Recycle, Users } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

export default function About() {
  const mvValues = [
    {
      icon: Target,
      title: "Misi",
      text:
        "Melestarikan budaya jambu Gemblakan dan meningkatkan kesejahteraan warga melalui inovasi olahan bernilai tambah dengan standar kualitas premium yang berkelanjutan.",
    },
    {
      icon: Eye,
      title: "Visi",
      text:
        "Menjadi ikon olahan jambu air Yogyakarta yang modern, dipercaya, dan berdaya saing, dengan akar komunitas yang kuat serta praktik yang ramah lingkungan.",
    },
    {
      icon: Heart,
      title: "Nilai-Nilai",
      text:
        "Gotong royong komunitas, keberlanjutan, kualitas & keamanan pangan, inovasi berbasis kearifan lokal, kejujuran dan kepercayaan.",
    },
  ];

  const history = [
    { year: "2018", title: "Jambunisasi Dimulai", text: "Gerakan berbagi bibit jambu ke tiap rumah, menghidupkan kembali identitas kampung." },
    { year: "2019", title: "POKJA JAMBU Terbentuk", text: "Diprakarsai ibu-ibu; wadah pelestarian, produksi olahan, dan pemberdayaan warga." },
    { year: "2022", title: "Resmi Kelompok Tani", text: "SK Lurah Suryatmajan No. 11/KPTS/ST/IV/2022-struktur makin mandiri & profesional." },
    { year: "2023", title: "Prestasi & Kolaborasi", text: "Juara Pra Koperasi & mitra program WMK UGM, pintu jejaring & peningkatan kapasitas." },
  ];


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

      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }} />

      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Foto produk */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-[28px] overflow-hidden shadow-xl ring-1 ring-black/5">
            <img src="images/ramean.jpg" alt="Jambu air segar" className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0" />
          </div>
          <div className="absolute -top-5 -right-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium text-slate-600 shadow ring-1 ring-black/5 flex items-center gap-2">
            <Sparkles className="h-4 w-4" color={BRAND.green} />
            Sejak 2019
          </div>
        </motion.div>

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

          <h2 className="mt-3 text-[clamp(24px,3.5vw,38px)] font-semibold tracking-tight" style={{ color: BRAND.ink }}>
            Jambuku: Rasa Lokal, Kualitas Premium
          </h2>

          <p className="mt-3 text-slate-700 leading-relaxed">
            Gemblakan Atas dulu dikenal sebagai Pasar & Pertigaan Jambu. Untuk melestarikan identitas itu, warga membentuk POKJA JAMBU (2019)
            dipelopori ibu-ibu, menggerakkan produksi olahan dan pemberdayaan ekonomi warga.
          </p>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Kini Jambuku menghadirkan 18+ inovasi: sambal, dodol, setup, sirup, keripik daun, selai, kerupuk, dan lainnya. Tahun 2022 melalui
            SK Lurah Suryatmajan No. 11/KPTS/ST/IV/2022, resmi menjadi Kelompok Tani, lebih mandiri, profesional, dan berdampak.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-slate-900">18+</div>
              <div className="text-xs text-slate-600">Inovasi Olahan</div>
            </div>
            <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-slate-900">3+</div>
              <div className="text-xs text-slate-600">Kolaborasi/Program</div>
            </div>
            <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-slate-900">2+</div>
              <div className="text-xs text-slate-600">Penghargaan</div>
            </div>
          </div>

          <figure className="mt-6 rounded-2xl border bg-white/80 backdrop-blur p-5 shadow-sm">
            <blockquote className="italic text-slate-700">
              “Inovasi terbaik lahir dari kampung. Tugas kami: membuatnya
              <span className="font-semibold"> terasa premium</span>, tanpa meninggalkan akar.”
            </blockquote>
            <figcaption className="mt-2 text-xs text-slate-500 flex items-center gap-2">
              <Award className="h-4 w-4" /> Tim Jambuku
            </figcaption>
          </figure>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-4">
        <PeloporCard name="Maryadi" role="Ketua Kelompok Tani Jambu" year="2018" photo="/images/pelopor.jpg" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="rounded-[28px] border bg-white/70 backdrop-blur p-6 sm:p-8 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-slate-900">Misi, Visi & Nilai</h3>
            <p className="mt-1 text-slate-600">Dasar yang membimbing perjalanan Jambuku.</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {mvValues.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <m.icon className="h-8 w-8 mx-auto mb-3" color={BRAND.green} />
                <div className="font-semibold text-slate-900">{m.title}</div>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pb-16 sm:pb-20 lg:pb-24">
        <div className="rounded-[28px] border bg-white/70 backdrop-blur p-6 sm:p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-slate-900 text-center">Sejarah Singkat</h3>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {history.map((h, i) => (
              <motion.div
                key={h.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="relative rounded-2xl bg-white p-5 shadow-sm border"
              >
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  {h.year}
                </div>
                <div className="mt-1 font-semibold text-slate-900">{h.title}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{h.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}