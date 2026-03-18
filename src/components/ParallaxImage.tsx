"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  /** Parallax intensity — higher = more movement. Default 10 (%) */
  intensity?: number;
}

export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  intensity = 10,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${intensity}%`, `${intensity}%`]
  );

  return (
    <div ref={ref} className={`overflow-hidden bg-black ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y }}
        transition={{
          ease: [0.76, 0, 0.24, 1] as const,
        }}
      />
    </div>
  );
}
