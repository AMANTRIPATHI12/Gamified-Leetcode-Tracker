import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// POST /leetcode → Fetches LeetCode submission stats only
app.post("/leetcode", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            matchedUser(username: "${username}") {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();
    const ac = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;

    if (!ac) {
      return res.status(404).json({ error: "No data found for user" });
    }

    const easy = ac.find((d) => d.difficulty === "Easy")?.count || 0;
    const medium = ac.find((d) => d.difficulty === "Medium")?.count || 0;
    const hard = ac.find((d) => d.difficulty === "Hard")?.count || 0;

    // ✅ Return stats — no writes to Firestore here!
    res.json({ easy, medium, hard });
  } catch (error) {
    console.error("❌ LeetCode fetch failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
