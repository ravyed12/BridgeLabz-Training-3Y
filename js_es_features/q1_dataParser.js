"use strict";

// Q1 – Dynamic Data Parser
// Goal: Parse mixed API data into Number/Boolean/String forms,
// separate valid and invalid numeric values, and print a report.

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

const validNumbers = [];
const invalidNumbers = [];

console.log("=".repeat(55));
console.log("         DYNAMIC DATA PARSER – CONVERSION REPORT");
console.log("=".repeat(55));

// Loop through each raw value and attempt conversions
for (let i = 0; i < apiData.length; i++) {
  const raw = apiData[i];

  // --- Type Conversions ---

  // Number(): converts string numerics, null → 0, undefined/NaN/" " → NaN
  const asNumber = Number(raw);

  // Boolean(): everything is true except: false, 0, "", null, undefined, NaN
  const asBoolean = Boolean(raw);

  // String(): safely converts any value including null and undefined
  const asString = String(raw);

  // --- Validity Check ---
  // isNaN() returns true if the value is NaN after conversion.
  // We also trim strings to catch blank-space-only entries like " ".
  // "100px" → Number("100px") = NaN, so it's invalid too.
  const trimmed = typeof raw === "string" ? raw.trim() : raw;
  const isValid = !isNaN(asNumber) && trimmed !== "" && trimmed !== null && trimmed !== undefined;

  console.log(`\nIndex [${i}] | Raw: ${JSON.stringify(raw)}`);
  console.log(`  → Number  : ${asNumber}`);
  console.log(`  → Boolean : ${asBoolean}`);
  console.log(`  → String  : "${asString}"`);

  if (isValid) {
    // Only push to validNumbers if it actually resolved to a real number
    validNumbers.push(asNumber);
    console.log(`  ✅ Valid numeric: ${asNumber}`);
  } else {
    invalidNumbers.push(raw);
    // Log invalid entries separately as instructed
    console.log(`  ❌ Invalid numeric – skipped. Raw value logged: ${JSON.stringify(raw)}`);
  }
}

// --- Final Report ---
console.log("\n" + "=".repeat(55));
console.log("SUMMARY REPORT");
console.log("=".repeat(55));
console.log("✅ Valid Numbers  :", validNumbers);
console.log("❌ Invalid Entries:", invalidNumbers.map(v => JSON.stringify(v)).join(", "));
console.log(`\nTotal entries   : ${apiData.length}`);
console.log(`Valid count     : ${validNumbers.length}`);
console.log(`Invalid count   : ${invalidNumbers.length}`);

// Sum and average of valid numeric data
const sum = validNumbers.reduce((acc, n) => acc + n, 0);
const avg = validNumbers.length > 0 ? (sum / validNumbers.length).toFixed(2) : "N/A";
console.log(`Sum of valid    : ${sum}`);
console.log(`Average of valid: ${avg}`);
