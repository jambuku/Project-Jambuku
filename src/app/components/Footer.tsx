"use client";

import { Phone, ShoppingBag, Mail, MapPin } from "lucide-react";
import { Instagram, Youtube, Music2 } from "lucide-react"; 

const BRAND = { green: "#4CAF50", red: "#FF3D3D" };

export default function Footer() {
  return (
    <footer
      className="relative isolate"
      style={{
        background:
          `radial-gradient(700px 300px at 0% 0%, ${BRAND.green}10, transparent),
           radial-gradient(700px 300px at 100% 100%, ${BRAND.red}10, transparent)`,
      }}
    >
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red})` }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Brand + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
           <img src="images/logo-jambuku.png"  alt="Jambuku Logo" className="h-8 w-auto"/>
            <div>
              <div className="text-xl font-semibold text-slate-900">Jambuku</div>
              <div className="text-sm text-slate-600">
                Olahan Jambu Air, Lokal, Premium, Berkelanjutan.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/6285786628379"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white shadow hover:shadow-md transition"
              style={{ backgroundColor: BRAND.green }}
            >
              <Phone className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-slate-900 hover:bg-slate-50 transition"
            >
              <ShoppingBag className="h-4 w-4" /> E-Commerce
            </a>
          </div>
        </div>

        {/* Links + Info */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-sm font-semibold text-slate-900">Navigasi</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#about" className="hover:text-slate-900">Tentang</a></li>
              <li><a href="#products" className="hover:text-slate-900">Produk</a></li>
              <li><a href="#certs" className="hover:text-slate-900">Sertifikasi</a></li>
              <li><a href="#events" className="hover:text-slate-900">Event</a></li>
              <li><a href="#contact" className="hover:text-slate-900">Kontak</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">Kontak</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><Mail className="h-4 w-4" /> jambuku2018@gmail.com</li>
              <li className="flex items-start gap-2"><Phone className="h-4 w-4" /> +62 857-8662-8379</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4" /> Balai RW Gemblakan Atas, Suryatmajan, Danurejan, Yogyakarta</li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">Ikuti Kami</div>
                <div className="mt-3 flex items-center gap-4 text-slate-600">
                <a href="https://www.instagram.com/jambuku.ga" className="hover:text-slate-900 transition">
                    <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.youtube.com/@JambukuGemblakanAtas" className="hover:text-slate-900 transition">
                    <Youtube className="h-5 w-5" />
                </a>
                </div>
            </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Jambuku. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
