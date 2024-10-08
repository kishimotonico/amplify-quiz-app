import type { Schema } from "../../amplify/data/resource";
type Option = Schema["Option"]["type"];

export function sortByLabel (options: Option[]): Option[] {
  return options.sort((a, b) => {
    const a_label = a.label ?? "";
    const b_label = b.label ?? "";
    return a_label < b_label ? -1 : a_label > b_label ? 1 : 0;
  });
}
