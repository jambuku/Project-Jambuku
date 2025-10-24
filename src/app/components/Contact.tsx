"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ShoppingBag } from "lucide-react";

const BRAND = { green: "#4CAF50", red: "#FF3D3D", ink: "#0f172a" };

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate bg-white"
      style={{
        backgroundImage: `
          radial-gradient(600px 300px at 0% 0%, ${BRAND.green}10, transparent),
          radial-gradient(600px 300px at 100% 100%, ${BRAND.red}10, transparent)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: BRAND.ink }}>
            Hubungi Kami
          </h2>
          <p className="mt-1 text-slate-600">
            Siap berkolaborasi? Tim Jambuku senang mendengar dari Anda.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-center">
          {/* Info & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-jambu-green" />
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Telepon/WhatsApp:</span> <br />
                <a href="https://wa.me/6285786628379" target="_blank" rel="noreferrer" className="text-jambu-green hover:underline">
                  +62 857-8662-8379
                </a>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-jambu-green" />
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Email:</span> <br />
                <a href="mailto:jambuku.ga@gmail.com" className="hover:underline">
                  jambuku2018@gmail.com
                </a>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-jambu-green" />
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Alamat:</span> <br />
                Balai RW Gemblakan Atas, Suryatmajan, Danurejan, Yogyakarta
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-md border"
          >
            <iframe
              title="Lokasi Jambuku"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.919948155565!2d110.3705!3d-7.7813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5789b7f1340f%3A0xa067d7f7a15f92f7!2sDanurejan%2C%20Yogyakarta!5e0!3m2!1sen!2sid!4v1695140000000!5m2!1sen!2sid"
              className="w-full h-[350px] border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
