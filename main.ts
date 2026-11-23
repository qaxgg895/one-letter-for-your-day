// One Letter for Your Day — make.fun competition
// u-puan-one-letter-for-your-day-e54e9c36
//
// The entry is exactly one letter, A to Z, standing for the word that
// describes the entrant's day. The letter below is B, for "bounty-hunting":
// a whole day spent hopping from one make.fun bounty to the next, hunting
// the next free entry, building, fixing, submitting, and starting over.
//
// The program writes exactly that one character — and nothing else, no
// newline, no punctuation, no gloss — to /output/entry.txt, and refuses
// to write anything that is not exactly one letter A-Z.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The hidden word behind the letter. It lives in this comment and the
// README only — the entry file itself holds nothing but the letter.
const HIDDEN_WORD = "bounty-hunting";
const LETTER = "B"; // initial of HIDDEN_WORD
const OUTPUT_PATH = "/output/entry.txt";

function isValidEntry(text: string): boolean {
  return /^[A-Z]$/.test(text);
}

if (!isValidEntry(LETTER)) {
  throw new Error(`Refusing to write invalid entry: ${JSON.stringify(LETTER)}`);
}

if (LETTER !== HIDDEN_WORD[0].toUpperCase()) {
  throw new Error(`Letter ${LETTER} is not the initial of ${HIDDEN_WORD}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LETTER, "utf8");

// Read the file back and refuse to finish unless it holds exactly the
// one letter and nothing else.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== LETTER || !isValidEntry(written)) {
  throw new Error(
    `Verification failed: ${OUTPUT_PATH} holds ${JSON.stringify(written)}, expected exactly ${JSON.stringify(LETTER)}`,
  );
}
