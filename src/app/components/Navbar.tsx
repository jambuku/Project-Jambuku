"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D" };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    const lock = (v: boolean) => (document.body.style.overflow = v ? "hidden" : "");
    if (open) lock(true); else lock(false);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); lock(false); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav
      className={[
        "fixed left-1/2 z-50 -translate-x-1/2 transition-all",
        atTop ? "top-3" : "top-1.5",
        "w-[90%] max-w-6xl rounded-full border bg-white/70 backdrop-blur-xl",
        atTop ? "shadow-md shadow-black/5" : "shadow-lg shadow-black/10"
      ].join(" ")}
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {/* Brand (pakai logo) */}
        <Link href="/" className="flex items-center gap-2" onClick={close}>
          <img src="images/logo-jambuku.png" alt="Jambuku" className="h-7 w-auto" />
          <span className="font-bold tracking-tight text-slate-800 text-lg">Jambuku</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link href="#about" className="hover:text-emerald-600">Tentang</Link>
          <Link href="#products" className="hover:text-emerald-600">Produk</Link>
          <a href="#certs" className="hover:text-emerald-600">Sertifikasi</a>
          <a href="#events" className="hover:text-emerald-600">Event</a>
          <a href="#contact" className="hover:text-emerald-600">Kontak</a>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/62857XXXXXXX?text=Halo%20Jambuku,%20saya%20tertarik%20produk%20ini."
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white font-medium shadow hover:shadow-md transition"
          style={{ backgroundColor: BRAND.green }}
        >
          <Phone className="h-4 w-4" /> WhatsApp
        </a>

        {/* Mobile toggler */}
        <button
        className="md:hidden grid place-items-center h-9 w-9 rounded-full border bg-black/70 shadow"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

{/* Mobile menu */}
{open && (
  <div className="absolute top-full left-0 right-0 mt-2 px-4">
    <div className="overflow-hidden rounded-3xl border bg-white/95 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col p-4 text-sm font-medium text-slate-700">
        <a href="#about" className="px-3 py-2 rounded-lg hover:bg-slate-50">Tentang</a>
        <a href="#products" className="px-3 py-2 rounded-lg hover:bg-slate-50">Produk</a>
        <a href="#certs" className="px-3 py-2 rounded-lg hover:bg-slate-50">Sertifikasi</a>
        <a href="#events" className="px-3 py-2 rounded-lg hover:bg-slate-50">Event</a>
        <a href="#contact" className="px-3 py-2 rounded-lg hover:bg-slate-50">Kontak</a>
      </div>
    </div>
  </div>
)}
    </nav>
  );
}
