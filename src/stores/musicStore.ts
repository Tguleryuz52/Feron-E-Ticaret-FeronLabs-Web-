"use client";

import { create } from "zustand";

/* ─── TRACK DATA ─────────────────────────────────────── */
export const TRACK = {
  title: "Running Up That Hill",
  artist: "Kate Bush",
  src: "/music/Kate Bush - Running Up That Hill - Official Music Video.mp3",
  cover: "/music/Kate Bush.jpg",
};

/* ─── MUSIC STORE — shared audio state ──────────────── */
interface MusicState {
  playing: boolean;
  current: number;
  duration: number;
  loaded: boolean;
  audioEl: HTMLAudioElement | null;

  setPlaying: (v: boolean) => void;
  setCurrent: (v: number) => void;
  setDuration: (v: number) => void;
  setLoaded: (v: boolean) => void;
  setAudioEl: (el: HTMLAudioElement) => void;

  toggle: () => void;
  skip: (delta: number) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  playing: false,
  current: 0,
  duration: 0,
  loaded: false,
  audioEl: null,

  setPlaying: (v) => set({ playing: v }),
  setCurrent: (v) => set({ current: v }),
  setDuration: (v) => set({ duration: v }),
  setLoaded: (v) => set({ loaded: v }),
  setAudioEl: (el) => set({ audioEl: el }),

  toggle: () => {
    const { audioEl, playing } = get();
    if (!audioEl) return;
    if (playing) {
      audioEl.pause();
      set({ playing: false });
    } else {
      audioEl.play().catch(() => {});
      set({ playing: true });
    }
  },

  skip: (delta) => {
    const { audioEl } = get();
    if (!audioEl) return;
    audioEl.currentTime = Math.max(
      0,
      Math.min(audioEl.duration || 0, audioEl.currentTime + delta),
    );
  },
}));

/* ─── Time formatter ─── */
export function fmtTime(s: number) {
  if (!isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${Math.floor(s % 60)
    .toString()
    .padStart(2, "0")}`;
}
