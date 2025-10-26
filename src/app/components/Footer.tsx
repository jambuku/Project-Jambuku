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
           <div className="flex flex-wrap items-center gap-2.5 pt-4">
                      <a
                        href="https://wa.me/6285786628379"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white shadow hover:shadow-md transition"
                        style={{ backgroundColor: BRAND.green }}
                      >
                        <Phone className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
          
                      <a
                        href="https://www.instagram.com/jambuku.ga/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white shadow hover:shadow-md transition bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        Instagram
                      </a>
          
                      <a
                        href="#products"
                        aria-label="E-Commerce"
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-50 transition"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        E-Commerce
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
                <a 
                href="https://linkr.bio/jambuku.ga?fbclid=PAZXh0bgNhZW0CMTEAAafjxwbPAifwZWPKf8GPpDk2Tc2jzceAZAVtkqi5vr3Olv2HEdGpN97aPRcfKQ_aem_UsP1r2lhuhTqmZD323tmnQ " 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  className="h-5 w-5"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 
                  5.373 12 12 12s12-5.373 12-12C24 5.373 
                  18.627 0 12 0zm0 22C6.477 22 2 17.523 
                  2 12S6.477 2 12 2s10 4.477 10 10-4.477 
                  10-10 10zm-.001-16c-.828 0-1.5.671-1.5 
                  1.5S11.171 9 11.999 9s1.5-.671 1.5-1.5S12.827 
                  6 11.999 6zm-1 3.75v8.25h2V9.75h-2z"/>
                </svg>
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
