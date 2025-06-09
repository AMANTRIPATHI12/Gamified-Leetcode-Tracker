import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const XP_PER_LEVEL = 100;

export default function useUserStats(uid) {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [nextLevelXP, setNextLevelXP] = useState(100);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    if (!uid) return;

    const ref = doc(db, "users", uid);

    const fetchStats = async () => {
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      const data = snap.data();

      const storedXP = data.xp || 0;
      const storedStreak = data.streak || 0;
      const lastActiveDateStr = data.lastActiveDate; // e.g. "Mon Jun 09 2025"

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toDateString(); // e.g. "Mon Jun 09 2025"

      let updatedStreak = storedStreak;
      let shouldUpdate = false;

      if (lastActiveDateStr !== todayStr) {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastActiveDateStr === yesterdayStr) {
          updatedStreak += 1; // Continue streak
        } else {
          updatedStreak = 1; // Reset streak
        }

        shouldUpdate = true;
      }

      // Update local state
      setXp(storedXP);
      setStreak(updatedStreak);
      setLevel(Math.floor(storedXP / XP_PER_LEVEL));
      setNextLevelXP((Math.floor(storedXP / XP_PER_LEVEL) + 1) * XP_PER_LEVEL);
      setProgressPercent(((storedXP % XP_PER_LEVEL) / XP_PER_LEVEL) * 100);

      // Update Firestore only if needed
      if (shouldUpdate) {
        await setDoc(
          ref,
          {
            streak: updatedStreak,
            lastActiveDate: todayStr,
          },
          { merge: true }
        );
      }
    };

    fetchStats();
  }, [uid]);

  return { xp, streak, level, nextLevelXP, progressPercent };
}
