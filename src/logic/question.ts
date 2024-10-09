import type { Schema } from "../../amplify/data/resource";
type Question = Schema["Question"]["type"];

export function sortQuestionsByLabel (questions: Question[]): Question[] {
  return questions.sort((a, b) => {
    const a_label = a.label ?? "";
    const b_label = b.label ?? "";
    return a_label < b_label ? -1 : a_label > b_label ? 1 : 0;
  });
}
