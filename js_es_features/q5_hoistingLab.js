"use strict";

// Q5 – Hoisting Lab: The Sequence Trap
// ─────────────────────────────────────────────────────────
// ORIGINAL CODE TO ANALYZE:
//
// console.log(score);   ← what happens here?
// announce();           ← what happens here?
// var score = 50;
// function announce() { console.log("Game started"); }
// let status = "ready";
// startGame();          ← what happens here?
// function startGame() { console.log(status); }
//
// HOISTING MEMORY STATES (what JS does BEFORE any line executes):
//
// PHASE: Memory Creation (Hoisting)
// ┌─────────────────┬────────────────────────────────────────────────────┐
// │ Identifier      │ Memory State at Hoist Time                         │
// ├─────────────────┼────────────────────────────────────────────────────┤
// │ score (var)     │ Allocated → set to UNDEFINED (not 50 yet)          │
// │ announce        │ Allocated → FULL function body stored in memory    │
// │ status (let)    │ Allocated → in TEMPORAL DEAD ZONE (TDZ), no value  │
// │ startGame       │ Allocated → FULL function body stored in memory    │
// └─────────────────┴────────────────────────────────────────────────────┘
//
// EXECUTION PHASE (line by line):
//
// console.log(score)  → score is hoisted as var → prints: undefined (NOT error)
// announce()          → function fully hoisted → prints: "Game started" ✅
// var score = 50      → NOW score gets the value 50
// let status = "ready"→ NOW status exits TDZ and gets value "ready"
// startGame()         → function fully hoisted → but inside, console.log(status):
//                       status is in TDZ when startGame was defined,
//                       BUT by the time startGame() is CALLED, let status = "ready"
//                       has already executed → prints "ready" ✅
//                       (if startGame() were called BEFORE let status = "ready",
//                        it would throw ReferenceError from TDZ)
// ─────────────────────────────────────────────────────────

console.log("\n=== PART 1: ORIGINAL HOISTING BEHAVIOUR ===\n");

// "use strict" at top doesn't change var hoisting but it does make
// undeclared variable assignments throw rather than silently succeed.

// At this point: score is hoisted (var) → value is undefined
console.log("score before assignment:", score); // undefined

// announce is fully hoisted — calling it before its declaration works
announce(); // "Game started"

var score = 50;

function announce() {
  console.log("Game started");
}

// let → TDZ from top of scope until this line; now it gets "ready"
let status = "ready";

// startGame is fully hoisted; calling it here works
// Inside, 'status' is already initialized (past the TDZ at call time)
startGame(); // "ready"

function startGame() {
  // WATCH POINT: inspect 'status' here in VS Code debugger.
  // It will show "ready" — proof TDZ ended before this call.
  console.log(status);
}

// ─────────────────────────────────────────────────────────
// PART 2: FIXED VERSION — declarations before use (best practice)
// ─────────────────────────────────────────────────────────

console.log("\n=== PART 2: FIXED – DECLARE BEFORE USE ===\n");

let fixedScore = 50;               // declared and assigned before use
let fixedStatus = "ready";         // let: no TDZ issue now

function fixedAnnounce() {
  console.log("Game started");
}

function fixedStartGame() {
  console.log(fixedStatus);        // clearly reads from an initialized variable
}

console.log("fixedScore:", fixedScore);  // 50 — no undefined surprise
fixedAnnounce();                         // "Game started"
fixedStartGame();                        // "ready"

// ─────────────────────────────────────────────────────────
// PART 3: ARROW FUNCTION VERSION — hoisting comparison
// ─────────────────────────────────────────────────────────

console.log("\n=== PART 3: ARROW FUNCTIONS – NO HOISTING ===\n");

// Arrow functions assigned to const/let are NOT hoisted.
// The variable is in TDZ until its line runs.
// Calling arrowAnnounce() BEFORE this line would throw:
// ReferenceError: Cannot access 'arrowAnnounce' before initialization

const arrowAnnounce = () => {
  console.log("Arrow: Game started");
};

const arrowScore = 50;
const arrowStatus = "ready";

const arrowStartGame = () => {
  // Arrow function captures 'this' from lexical scope (not relevant here),
  // but for hoisting: arrowStartGame CANNOT be called before this line.
  console.log("Arrow status:", arrowStatus);
};

arrowAnnounce();   // works — called AFTER declaration
arrowStartGame();  // works — called AFTER declaration

// ─────────────────────────────────────────────────────────
// HOISTING COMPARISON TABLE:
//
// ┌──────────────────────┬───────────────┬──────────────────┬──────────────────┐
// │ Declaration Type     │ Hoisted?      │ Usable Before?   │ Initial Value    │
// ├──────────────────────┼───────────────┼──────────────────┼──────────────────┤
// │ var x                │ Yes           │ Yes (undefined)  │ undefined        │
// │ let x / const x      │ Yes (TDZ)     │ No (TDZ Error)   │ <uninitialized>  │
// │ function foo() {}    │ Yes (fully)   │ Yes (works)      │ Full function    │
// │ const foo = () => {} │ Yes (TDZ)     │ No (TDZ Error)   │ <uninitialized>  │
// │ var foo = () => {}   │ Yes (var part)│ Yes but undefined│ undefined        │
// └──────────────────────┴───────────────┴──────────────────┴──────────────────┘
//
// KEY TAKEAWAY:
// Only 'function declarations' are fully hoisted with their body.
// var is hoisted but as undefined. let/const are in TDZ until their line.
// Arrow functions follow let/const rules — they are NOT callable before declaration.
// ─────────────────────────────────────────────────────────

console.log("\n=== HOISTING LAB COMPLETE ===");
