"use strict";

// Q4 – Debugging Mystery
// ─────────────────────────────────────────────────────────
// ORIGINAL BROKEN CODE:
//
// "use strict";
// function showMessage() {
//   greeting = "Welcome";   // ← No var/let/const declaration
//   console.log(greeting);
// }
// showMessage();
//
// WHY IT THROWS:
// In non-strict mode, assigning to an undeclared variable (greeting = "Welcome")
// silently creates a property on the global object (global.greeting in Node.js,
// window.greeting in browsers). This is a common source of bugs — accidental globals
// pollute the shared namespace and persist across function calls.
//
// "use strict" removes this unsafe fallback. Instead of creating a global,
// JavaScript throws a ReferenceError: greeting is not defined.
//
// CALL STACK at the point of the error:
//   at showMessage (q4_debuggingMystery.js:X:Y)   ← assignment to undeclared var
//   at Object.<anonymous> (q4_debuggingMystery.js) ← call site
//
// VS Code DEBUG TIP:
// Set a breakpoint on the 'greeting = ...' line.
// In the Call Stack panel you will see showMessage → anonymous.
// In the Variables panel, 'greeting' won't exist at all — proof it was never declared.
// ─────────────────────────────────────────────────────────

// ✅ FIX: declare 'greeting' with let before assigning
function showMessage() {
  // 'let' confines 'greeting' to this function's block scope.
  // It cannot leak out or pollute the global object.
  let greeting = "Welcome";

  // WATCH POINT: at this console.log, inspect 'greeting' in the debugger.
  // Its scope will show as "Local" — not "Global". That's the fix working.
  console.log(greeting);
}

showMessage(); // Output: Welcome

// ─────────────────────────────────────────────────────────
// SCOPE DECLARATION RULES — HOW THEY CHANGED BEHAVIOUR:
//
// Without declaration (broken):
//   greeting = "Welcome"
//   → JS engine searches scope chain → reaches global → creates global property
//   → Strict mode: ReferenceError thrown instead
//
// With let (fixed):
//   let greeting = "Welcome"
//   → JS engine allocates 'greeting' in showMessage's local scope
//   → Only accessible inside showMessage; gone after function returns
//   → Works in both strict and non-strict mode
//
// var vs let vs const (scope comparison):
// ─────────────────────────────────────────────────────────

function scopeDemo() {
  // 'var' is function-scoped — accessible anywhere in scopeDemo
  var varGreeting = "var: Hello";

  if (true) {
    // 'let' is block-scoped — only accessible inside this if-block
    let letGreeting = "let: Hi";

    // 'const' is block-scoped and cannot be reassigned
    const constGreeting = "const: Hey";

    console.log(letGreeting);   // accessible here
    console.log(constGreeting); // accessible here
  }

  console.log(varGreeting);     // accessible here (function scope)
  // console.log(letGreeting);  // ← ReferenceError: not defined outside block
  // console.log(constGreeting);// ← ReferenceError: not defined outside block
}

scopeDemo();

// ─────────────────────────────────────────────────────────
// ADDITIONAL STRICT MODE BENEFITS DEMONSTRATED:
// ─────────────────────────────────────────────────────────

// 1. Prevents duplicate parameter names
// function bad(a, a) {} // ← SyntaxError in strict mode

// 2. 'this' is undefined inside plain functions (not methods)
function checkThis() {
  // In non-strict, 'this' here would be the global object
  // In strict mode, 'this' is undefined — prevents accidental global pollution
  console.log("'this' in strict function:", this); // undefined
}
checkThis();
