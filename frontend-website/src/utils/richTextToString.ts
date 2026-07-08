// src/utils/richTextToString.ts
export function richTextToString(blocks: any): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => block.children?.map((c: any) => c.text).join("") ?? "")
    .filter(Boolean)
    .join(" ");
}