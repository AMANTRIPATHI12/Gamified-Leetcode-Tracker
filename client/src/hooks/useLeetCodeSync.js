import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useLeetCodeSync = (uid) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const userRef = doc(db, "users", uid);

    // Listen to user doc changes for realtime update
    const unsubscribe = onSnapshot(userRef, async (snap) => {
      if (!snap.exists()) {
        setLoading(false);
        setStats(null);
        return;
      }

      const user = snap.data();

      if (!user.leetcodeUsername) {
        setLoading(false);
        setStats(null);
        return;
      }

      // Sync XP/stats once
      const res = await fetch("http://localhost:3001/leetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.leetcodeUsername }),
      });

      const data = await res.json();
      const { easy, medium, hard } = data;
      const xp = easy * 10 + medium * 20 + hard * 40;

      const today = new Date().toISOString().slice(0, 10);
      const logs = user.logs || [];
      const alreadyLogged = logs.find((log) => log.date === today);

      if (!alreadyLogged) {
        logs.push({ date: today, easy, medium, hard, xpGained: xp });
      }

      let streak = user.streak || 0;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const loggedYesterday = logs.find((log) => log.date === yesterday);
      const wasHereToday = logs.find((log) => log.date === today);

      if (wasHereToday && loggedYesterday) streak += 1;
      else if (wasHereToday) streak = 1;

      await updateDoc(userRef, {
        xp,
        level: Math.floor(xp / 100),
        streak,
        lastCheckIn: today,
        logs,
      });

      // Set stats from updated doc
      setStats({
        xp,
        level: Math.floor(xp / 100),
        streak,
        logs,
        assignedProblems: user.assignedProblems || [], // add this if stored
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { stats, loading };
};
