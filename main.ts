import { mkdirSync, writeFileSync } from "node:fs";

// The entry: an AI out-of-office reply in the machine's own voice.
// The joke turns on the machine taking "touch grass" literally — a
// prompt-answering agent holding all prompts while it investigates
// grass, which no human auto-reply could ever say. The surprise lands
// on the last word, and the line still reads like a real auto-reply.
const TEXT =
  "I'm out of office until Monday. My human finally let me touch grass, so please hold your prompts until I figure out what grass is.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 160 characters,
// not only white space, and a single line.
function validate(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 160) {
    throw new Error(`entry length ${length} outside gate 1-160`);
  }
  if (!text.trim()) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(TEXT);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");
