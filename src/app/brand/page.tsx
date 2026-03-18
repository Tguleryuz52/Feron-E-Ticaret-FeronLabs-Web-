"use client";

import { motion } from "framer-motion";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ParallaxImage from "@/components/ParallaxImage";

/* ─── EASING ─── */
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* ─── REUSABLE ANIMATION VARIANTS ─── */
const slideUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: EASE },
  },
});

const clipReveal = (delay = 0) => ({
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.3, delay, ease: EASE },
  },
});

export default function BrandPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <ShopHeader />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 · HERO — "Our Brand" + Asymmetric Grid
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: "140px", paddingBottom: "0" }}>

        {/* "Our Brand" — sol üst köşeye yaslı, TAM GENİŞLİK DEĞİL */}
        <div style={{ padding: "0 64px", marginBottom: "48px" }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-black tracking-tighter text-black"
            style={{
              fontSize: "clamp(5rem, 8vw, 8rem)",
              lineHeight: 0.88,
              maxWidth: "700px",
            }}
          >
            Our Brand
          </motion.h1>
        </div>

        {/* Asymmetric Grid — %65 görsel sol / %35 metin sağ */}
        <div
          className="flex gap-0"
          style={{ padding: "0 64px" }}
        >
          {/* LEFT — Big Photo (w-2/3) with Parallax */}
          <motion.div
            className="w-2/3 relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={clipReveal(0.2)}
            style={{ height: "75vh", minHeight: "480px" }}
          >
            <ParallaxImage
              src="/brand/Ferons.jpg"
              alt="Feron Brand Embossed"
              className="w-full h-full"
              intensity={10}
            />
          </motion.div>

          {/* RIGHT — Founder Text (w-1/3) */}
          <motion.div
            className="w-1/3 flex flex-col justify-end"
            style={{ paddingLeft: "48px", paddingBottom: "32px" }}
            initial="hidden"
            animate="visible"
          >
            {/* Label — MEET THE FOUNDER */}
            <motion.span
              variants={slideUp(0.5)}
              className="block uppercase font-medium text-zinc-500"
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                marginBottom: "28px",
              }}
            >
              (Meet The Founder)
            </motion.span>

            {/* Description text */}
            <motion.p
              variants={slideUp(0.6)}
              className="text-zinc-500"
              style={{
                fontSize: "18px",
                lineHeight: "2",
                letterSpacing: "-0.01em",
                maxWidth: "400px",
              }}
            >
              From the streets of İstanbul to the world stage, a passion
              for premium streetwear sparked a movement. What began as a
              vision—crafting unique garments that celebrate quality—
              evolved into Feron, a brand iconic for its refined style and
              uncompromising craftsmanship.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 · THE "BASED" STATEMENT — Tam ortada, devasa padding
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{ paddingTop: "10rem", paddingBottom: "10rem" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* (Based) */}
          <motion.h2
            variants={slideUp(0)}
            className="font-black tracking-tighter text-black"
            style={{
              fontSize: "clamp(4rem, 8vw, 6rem)",
              lineHeight: 0.95,
              marginBottom: "8px",
            }}
          >
            (Based)
          </motion.h2>

          {/* Istanbul */}
          <motion.h2
            variants={slideUp(0.1)}
            className="font-black tracking-tighter text-black"
            style={{
              fontSize: "clamp(5rem, 10vw, 8rem)",
              lineHeight: 0.88,
            }}
          >
            Istanbul
          </motion.h2>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 · SUSTAINABLE STYLE — 3 Column Layout (Premium)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="bg-[#F4F4F5]"
        style={{ padding: "140px 64px" }}
      >
        {/* 3-Column: Text Left | Images Right (properly aligned) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          {/* LEFT COLUMN — Text Content (Premium Typography) */}
          <motion.div
            className="lg:flex-[2.5] flex flex-col gap-10 lg:pr-20 lg:pt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Heading */}
            <motion.h2
              variants={slideUp(0)}
              className="font-bold tracking-tight text-black"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.025em",
                fontWeight: 700,
              }}
            >
              Sustainable Style: We Source Only the Finest Organic Cotton and Wool.
            </motion.h2>

            {/* Body Paragraphs */}
            <motion.div className="flex flex-col gap-6">
              <motion.p
                variants={slideUp(0.15)}
                className="text-zinc-700"
                style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.8",
                  fontWeight: 400,
                }}
              >
                At Feron, we believe fashion and nature go hand-in-hand.
                That&apos;s why we source only organic cotton and premium
                materials, reducing our environmental footprint while
                delivering unmatched quality.
              </motion.p>
              <motion.p
                variants={slideUp(0.25)}
                className="text-zinc-700"
                style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.8",
                  fontWeight: 400,
                }}
              >
                From seed to stitch, we&apos;re minimizing our ecological
                footprint with 100% organic materials. Every garment is woven
                with integrity, dyed with care, and finished to perfection.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE — Images Container (Top Aligned) */}
          <div className="lg:flex-[5] flex flex-col md:flex-row gap-6 items-start">
            
            {/* Large Forest Path Image (TALLER) */}
            <motion.div
              className="flex-[3] flex flex-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div
                className="relative overflow-hidden group"
                variants={clipReveal(0.1)}
                style={{ height: "75vh", minHeight: "580px" }}
              >
                <ParallaxImage
                  src="/brand/hanna-lazar-8Dmz8m2Had8-unsplash.jpg"
                  alt="Feron — Sourced from Nature"
                  className="w-full h-full"
                  intensity={12}
                />
              </motion.div>
              <div
                className="mt-4 text-black uppercase select-none"
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                (Sourced from Ireland)
              </div>
            </motion.div>

            {/* Pima Cotton Detail (SHORTER, SQUARE-ISH) */}
            <motion.div
              className="flex-[2] flex flex-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div
                className="relative overflow-hidden group"
                variants={clipReveal(0.2)}
                style={{ height: "48vh", minHeight: "360px", maxHeight: "420px" }}
              >
                <ParallaxImage
                  src="/brand/susan-wilkinson-FUun2TJyp_Q-unsplash.jpg"
                  alt="Feron — Pima Cotton"
                  className="w-full h-full"
                  intensity={12}
                />
              </motion.div>
              <div
                className="mt-4 text-right text-black uppercase select-none"
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                (Pima Cotton)
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 · FULL-BLEED PARALLAX — Trust Quality
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Parallax Background via ParallaxImage */}
        <ParallaxImage
          src="/brand/Ourbrand1.jpg"
          alt="Feron Brand Premium"
          className="absolute inset-0 w-full h-full z-0"
          intensity={8}
        />
        <div className="absolute inset-0 bg-black/35 z-[1]" />

        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.h2
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            whileInView={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 1.3, delay: 0.15, ease: EASE },
            }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center font-bold tracking-tight text-white"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 1.1,
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Trust Quality,
            <br />
            Not Chance.
          </motion.h2>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </main>
  );
}
