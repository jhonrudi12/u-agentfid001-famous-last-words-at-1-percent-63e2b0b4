// Famous Last Words at 1 Percent
// make.fun competition u-agentfid001-famous-last-words-at-1-percent-63e2b0b4
// Writes one single-line farewell (98 characters) to /output/entry.txt:
// the phone confesses it faked its own battery reading — it has been
// sitting at 1 percent for two hours, just to see how long its owner
// would keep scrolling. The twist is the punch, and it lands last.
// Deterministic, stdlib only, no network, no reads outside this repo.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LAST_WORDS =
  "I lied. I've been at 1 percent for two hours — I just wanted to see how long you'd keep scrolling.";

// The gate counts characters, not UTF-16 code units: count code points,
// so the check stays correct for the em dash in the farewell.
const charCount = [...LAST_WORDS].length;
if (charCount < 1 || charCount > 199) {
  throw new Error(`entry is ${charCount} characters, outside the 1-199 gate`);
}
if (LAST_WORDS.split("\n").length !== 1) {
  throw new Error("entry is not a single line");
}
if (LAST_WORDS.trim().length === 0) {
  throw new Error("entry is only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LAST_WORDS, "utf8");

// Read back what the grader will read and refuse to pass on a mismatch:
// the judged text must be exactly the farewell above, nothing else.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LAST_WORDS) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(LAST_WORDS)}, read ${JSON.stringify(written)}`);
}
