"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, UserRound, X } from "lucide-react";

type PeloporProps = {
  name?: string;
  role?: string;
  year?: string;
  photo?: string; 
};

const BRAND = { green: "#4CAF50", red: "#FF3D3D" };

export default function PeloporCard({
  name = "Maryadi",
  role = "Ketua RW Gemblakan Atas",
  year = "2018",
  photo = "/images/pelopor.jpg",
}: PeloporProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="group relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur p-5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 bg-white">
            {photo ? (
              <img src={photo} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-slate-400">
                <UserRound className="h-6 w-6" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-900">Sang Pelopor</h3>
              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {year}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {name} — {role}
            </p>
          </div>
        </div>

        <div className="mt-3 flex gap-2 text-slate-700">
          <Quote className="h-5 w-5 text-emerald-600 mt-0.5" />
          <p className="text-sm leading-relaxed">
            Memulai “Jambunisasi”: membagikan bibit jambu ke tiap rumah untuk
            penghijauan dan menghidupkan kembali identitas kampung, cikal bakal Jambuku.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-50 transition"
          >
            Baca cerita
          </button>

          <div
            aria-hidden
            className="h-1 w-24 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})`,
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
             style={{ background: `radial-gradient(400px 120px at 80% 0%, #ffffff44, transparent 60%)` }}
        />
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="pelopor-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/50 px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-black/5 bg-white">
                  {photo ? (
                    <img src={photo} alt={name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-slate-400">
                      <UserRound className="h-7 w-7" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-slate-500">{year}</div>
                  <div className="font-semibold text-slate-900">Sang Pelopor — {name}</div>
                  <div className="text-sm text-slate-600">{role}</div>
                </div>
              </div>

              <div className="mt-4 text-slate-700 text-sm leading-relaxed">
                Pada {year}, {name} memulai gerakan <em>Jambunisasi</em> di Gemblakan Atas.
                Dimana setiap rumah warga Kampung Gemblakan Atas RW 03 saya beri bibit pohon
                jambu untuk ditanam. Hal ini bertujuan untuk penghijauan, karena di dekat
                Malioboro yang jalannya sering macet banyak menimbulkan polusi. Maka,
                saya sebagai ketua RW berinisiasi untuk membuat program tersebut. Lalu
                kenapa saya memilih pohon jambu air itu karena di dekat sini ada pasar
                jambu, jembatan jambu, dan sebagainya.
                Seiring berjalannya waktu, akhirnya pohon jambu yang ditanam bersama
                oleh warga Kampung Gemblakan Atas RW 03 membuahkan hasil. Namun
                karena banyaknya hasil panen, tidak semua jambu dapat terjual habis.
                Sehingga jambu yang tidak terjual menjadi busuk. Lalu para ibu-ibu warga
                Kampung Gemblakan Atas RW 03 berinovasi untuk mengolah jambu
                menjadi berbagai macam bentuk makanan olahan. Sehingga, hasil inovasi
                dari para warga memiliki nilai jual yang tinggi dan unik
              </div>

              <div
                aria-hidden
                className="mt-6 h-1 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})`,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
