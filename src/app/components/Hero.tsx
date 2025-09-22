"use client";
import { motion } from "framer-motion";
import { Phone, ShoppingBag, Sparkles } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const PALETTE = { primary: "#4CAF50" };

// 👉 ganti URL ini ke gambar background hero kamu
const HERO_BG =
  "images/jambu blur.jpg";

const Hero = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const images = [
    // Ganti dengan aset asli lo
    "https://images.unsplash.com/photo-1533330265487-9d2bd48b57e4?q=80&w=687&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595650248893-df56f2066e04?q=80&w=1171&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1690574467148-af495c5e31d4?q=80&w=735&auto=format&fit=crop",
  ];

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image + gradient overlay kiri->kanan biar teks terbaca */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_BG}
          alt="Hero Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-center py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto px-6">
        {/* Kiri: copy (pakai teks putih karena overlay gelap) */}
        <div className="lg:col-span-1 text-white">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3 py-1 text-xs sm:text-sm shadow-sm backdrop-blur"
          >
            <Sparkles className="h-4 w-4" style={{ color: PALETTE.primary }} />
            Meracik Jambu Lokal, Menjadi Rasa Premium
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-3 text-[clamp(28px,4vw,44px)] font-semibold leading-tight"
          >
            Dari kebun ke dapur, dari dapur ke hati.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-3 text-sm sm:text-base max-w-xl text-white/90"
          >
            Olahan jambu air pilihan, dibuat dengan cara yang sederhana namun penuh perhatian. 
            Dari komunitas lokal, kami hadirkan rasa segar dan kualitas yang bisa kamu percaya.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://wa.me/6285786628379"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white shadow-md hover:shadow-lg focus:outline-none"
              style={{ backgroundColor: PALETTE.primary }}
            >
              <Phone className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 bg-white/20 text-white hover:bg-white/30"
            >
              <ShoppingBag className="h-4 w-4" /> Lihat Produk
            </a>
          </motion.div>
        </div>

        {/* Kanan: slider autoplay tanpa panah, bisa drag/swipe manual */}
        <div className="lg:col-span-2">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex gap-4">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="embla__slide min-w-0 flex-[0_0_80%] sm:flex-[0_0_60%] lg:flex-[0_0_48%]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border bg-white/20 shadow-sm">
                    <img
                      src={src}
                      alt={`Jambuku slide ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-black/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Tidak ada tombol panah; autoplay aktif, user tetap bisa drag/swipe */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
