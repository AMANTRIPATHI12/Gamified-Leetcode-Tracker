import React from "react";

const skills = [
  { id: 1, title: "XP Boost", desc: "+10% XP per day", unlocked: true },
  { id: 2, title: "Daily Streak Shield", desc: "Protect 1 missed day", unlocked: false },
  { id: 3, title: "Alternate Theme Mode", desc: "Unlock Sekiro early", unlocked: false },
];

const SkillTree = () => {
  return (
    <div className="bg-white/10 p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-3 drop-shadow bg-black/30 px-2 py-1 rounded inline-block">
        Skill Tree
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`rounded p-3 transition border ${
              skill.unlocked
                ? "bg-green-700/20 border-green-400"
                : "bg-gray-800/30 border-gray-600"
            }`}
          >
            <h3 className="font-bold text-lg">{skill.title}</h3>
            <p className="text-sm text-gray-300">{skill.desc}</p>
            <span
              className={`inline-block text-xs mt-2 px-2 py-1 rounded ${
                skill.unlocked ? "bg-green-500 text-black" : "bg-gray-600 text-white"
              }`}
            >
              {skill.unlocked ? "Unlocked" : "Locked"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillTree;
