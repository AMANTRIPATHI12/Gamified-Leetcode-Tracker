export default function useBadges(xp, streak) {
  const badges = [];

  // XP Milestones
  if (xp >= 100) badges.push({ label: "100 XP", icon: "🏅", description: "Reached 100 XP" });
  if (xp >= 500) badges.push({ label: "500 XP", icon: "🏆", description: "Halfway to 1K!" });
  if (xp >= 1000) badges.push({ label: "1000 XP", icon: "🥇", description: "Reached 1K XP" });
  if (xp >= 2000) badges.push({ label: "2000 XP", icon: "🥈", description: "Reached 2k XP you can rest now for a while" });
  if (xp >= 3000) badges.push({ label: "3000 XP", icon: "🥉", description: "Reached 3000 XP Keep Crushing" });

  // Streak Milestones
  if (streak >= 3) badges.push({ label: "3-Day Streak", icon: "🔥", description: "On fire!" });
  if (streak >= 7) badges.push({ label: "7-Day Streak", icon: "⚡", description: "Weekly streak master" });

  // Add more badges as needed later...

  return badges;
}
