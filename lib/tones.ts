// Starters(노랑) · Workers(주황) · Company(브라운) — 고객군마다 색을 다르게 써서 페이지가 구분돼요.
export type Tone = "starters" | "workers" | "company";

export const TONES: Record<
  Tone,
  { label: string; bg: string; border: string; text: string; accent: string; blobs: [string, string, string]; glow: string }
> = {
  starters: {
    label: "Starters",
    bg: "bg-butter-pale",
    border: "border-butter",
    text: "text-brown",
    accent: "#FFEB51",
    blobs: ["rgba(255,235,81,.95)", "rgba(255,232,85,.8)", "rgba(255,236,140,.85)"],
    glow: "rgba(255,235,81,.85)",
  },
  workers: {
    label: "Workers",
    bg: "bg-amber-pale",
    border: "border-amber-soft",
    text: "text-amber",
    accent: "#F0A040",
    blobs: ["rgba(255,176,80,.85)", "rgba(255,214,150,.9)", "rgba(255,235,81,.6)"],
    glow: "rgba(255,214,150,.95)",
  },
  company: {
    label: "Company",
    bg: "bg-clay-pale",
    border: "border-clay-soft",
    text: "text-clay",
    accent: "#A8762E",
    blobs: ["rgba(176,124,64,.85)", "rgba(214,178,128,.95)", "rgba(255,235,81,.45)"],
    glow: "rgba(232,210,176,.95)",
  },
};
