"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMusicStore, TRACK } from "@/stores/musicStore";
import FloatingMiniPlayer from "@/components/FloatingMiniPlayer";

/* ═══════════════════════════════════════════════════════
   GLOBAL MUSIC PROVIDER
   – Renders the shared <audio> once at root level
   – Shows the floating mini-player on non-hero pages
   ═══════════════════════════════════════════════════════ */
export default function GlobalMusicProvider() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const setAudioEl = useMusicStore((s) => s.setAudioEl);
  const setCurrent = useMusicStore((s) => s.setCurrent);
  const setDuration = useMusicStore((s) => s.setDuration);
  const setLoaded = useMusicStore((s) => s.setLoaded);
  const setPlaying = useMusicStore((s) => s.setPlaying);

  /* Register audio element in store */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    setAudioEl(a);

    const onMeta = () => {
      setDuration(a.duration);
      setLoaded(true);
    };
    const onTime = () => setCurrent(a.currentTime);
    const onEnd = () => {
      setPlaying(false);
      a.currentTime = 0;
      setCurrent(0);
    };

    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, [setAudioEl, setCurrent, setDuration, setLoaded, setPlaying]);

  return (
    <>
      <audio ref={audioRef} src={TRACK.src} preload="metadata" />
      {/* Show floating mini-player only on non-home pages */}
      {!isHome && <FloatingMiniPlayer />}
    </>
  );
}
