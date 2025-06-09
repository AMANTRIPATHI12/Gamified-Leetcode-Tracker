const themeMap = {
  godofwar: "godofwar.mp4",
  eldenring: "eldenring.mp4",
  sekiro: "sekiro.mp4",
};

export function getAvailableThemes() {
  return ["auto", "godofwar", "eldenring", "sekiro"];
}

export default function useThemeBackground(level) {
  const selected = localStorage.getItem("theme_override") || "auto";

  if (selected !== "auto") {
    return `/backgrounds/${themeMap[selected] || themeMap.godofwar}`;
  }

  // Fallback to XP-based themes
  if (level <= 2) return "/backgrounds/godofwar.mp4";
  if (level <= 6) return "/backgrounds/eldenring.mp4";
  return "/backgrounds/sekiro.mp4";
}
