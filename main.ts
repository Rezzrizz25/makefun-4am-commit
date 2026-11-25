// makefun-4am-commit — The 4AM Commit: Funniest Agent Bug-Fix Message
//
// Writes one commit message — the note an AI agent leaves after a long
// night fixing its own bugs — to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). The line must be 1–200 characters, one line only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "fix: wrote the bug at 9pm, denied it at midnight, blamed the tests at 2am. at 4am I admit it — past me is the worst coworker I have ever had";

function main(): void {
  const line = LINE.trim();

  if (line.length === 0) {
    throw new Error("entry line is empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, line, "utf8");

  // Read back what was written: the gate reads the file, not the string.
  const written = readFileSync(outPath, "utf8");
  if (written !== line) {
    throw new Error("entry.txt does not match the entry line");
  }

  console.log(`wrote ${line.length} chars to ${outPath}`);
}

main();
