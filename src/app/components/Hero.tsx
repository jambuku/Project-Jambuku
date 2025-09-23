"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, ShoppingBag } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const BRAND = { green: "#4CAF50", red: "#FF3D3D" };
const LOGO_SRC = "images/logo-jambuku.png";

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, duration: 18 },
    [Autoplay({ delay: 3500, stopOnInteraction: true })] 
  );

  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = (idx: number) => emblaApi?.scrollTo(idx);

  const bgImages = [
    "images/jambu blur.jpg",
    "https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1170&auto=format&fit=crop",
  ];

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[92svh] min-h-[640px] w-full">
        <div className="absolute inset-0 -z-10">
          <div className="embla h-full" ref={emblaRef}>
            <div className="embla__container flex h-full">
              {bgImages.map((src, i) => (
                <div key={i} className="embla__slide relative min-w-full h-full">
                  <img
                    src={src}
                    alt={`Jambuku bg ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 h-full w-full grid place-items-center px-6 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <motion.img
              src={LOGO_SRC}
              alt="Jambuku"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto h-50 w-auto sm:h-32 md:h-36 lg:h-40"
            />


            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 text-[clamp(30px,5vw,60px)] font-semibold leading-tight"
            >
              Olahan Jambu Air, Rasa Lokal, Kualitas Premium.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="mt-3 text-white/90 text-base sm:text-lg"
            >
              Dibuat oleh komunitas, berkelanjutan, dipercaya klien. Kenalan cepat & coba produknya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="https://wa.me/6285786628379"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-white shadow-md hover:shadow-lg"
                style={{ backgroundColor: BRAND.green }}
              >
                <Phone className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 bg-white/15 backdrop-blur text-white hover:bg-white/25"
              >
                <ShoppingBag className="h-5 w-5" />
                Lihat Produk
              </a>
            </motion.div>

            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: snapCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition-all",
                    selected === i
                      ? "bg-white shadow ring-2 ring-white/70 scale-110"
                      : "bg-white/50 hover:bg-white/80"
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
