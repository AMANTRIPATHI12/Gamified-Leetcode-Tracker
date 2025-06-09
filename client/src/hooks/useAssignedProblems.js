import { useMemo } from "react";
import { problemBank } from "../data/sampleProblemBank";

export default function useAssignedProblems(level) {
  return useMemo(() => {
    if (level < 3) {
      return problemBank.Easy.slice(0, 2);
    } else if (level < 5) {
      return [
        problemBank.Easy[0],
        problemBank.Medium[0]
      ];
    } else if (level < 8) {
      return problemBank.Medium.slice(0, 3);
    } else if (level < 10) {
      return [
        problemBank.Medium[1],
        problemBank.Hard[0],
        problemBank.Hard[1]
      ];
    } else {
      return problemBank.Hard.slice(0, 3);
    }
  }, [level]);
}
