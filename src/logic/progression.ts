import type { Schema } from "../../amplify/data/resource";
type Progression = Schema["Progression"]["type"];

export function sortByCreatedAt (progressions: Progression[]): Progression[] {
  return progressions.sort((a, b) => {
    const a_time = a.createdAt ?? "";
    const b_time = b.createdAt ?? "";
    return a_time < b_time ? -1 : a_time > b_time ? 1 : 0;
  });
}

export function getCurrentProgression (progressions: Progression[]): Progression | undefined {
  return sortByCreatedAt(progressions).at(-1);
}

export function isQuestionInProgress (progressions: Progression[], questionID: string): boolean {
  const currentProgression = getCurrentProgression(progressions);
  return currentProgression?.questionID === questionID && currentProgression?.state === "in_progress";
}

export function isQuestionFinished (progressions: Progression[], questionID: string): boolean {
  return progressions.filter((p) => p.questionID === questionID && p.state === "finished").length > 0;
}

export function isQuestionNotStarted (progressions: Progression[], questionID: string): boolean {
  return progressions.filter((p) => p.questionID === questionID).length === 0;
}
