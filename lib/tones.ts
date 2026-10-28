// Starters(노랑) · Workers(올리브) · Company(브라운) — 고객군마다 색을 다르게 써서 페이지가 구분돼요.
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
    bg: "bg-sage-pale",
    border: "border-sage-soft",
    text: "text-sage",
    accent: "#70631F",
    blobs: ["rgba(176,190,118,.9)", "rgba(206,216,150,.9)", "rgba(255,235,81,.55)"],
    glow: "rgba(221,227,184,.95)",
  },
  company: {
    label: "Company",
    bg: "bg-clay-pale",
    border: "border-clay-soft",
    text: "text-clay",
    accent: "#8A5A1E",
    blobs: ["rgba(214,170,110,.9)", "rgba(232,205,160,.95)", "rgba(255,235,81,.5)"],
    glow: "rgba(232,210,176,.95)",
  },
};
