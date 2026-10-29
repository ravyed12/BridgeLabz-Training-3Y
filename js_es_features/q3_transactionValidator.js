"use strict";

// Q3 – Transaction Validator
// Custom error classes give each failure a distinct type,
// making it easy to categorize errors in the catch block.

// --- Custom Error Classes ---
class NullTransactionError extends Error {
  constructor(index) {
    super(`Transaction at index ${index} is null.`);
    this.name = "NullTransactionError";
  }
}

class MissingFieldError extends Error {
  constructor(id, field) {
    super(`Transaction ${id !== undefined ? `#${id}` : "(unknown)"} is missing field: '${field}'.`);
    this.name = "MissingFieldError";
  }
}

class NegativeAmountError extends Error {
  constructor(id, amount) {
    super(`Transaction #${id} has a negative amount: ${amount}.`);
    this.name = "NegativeAmountError";
  }
}

// --- Data ---
const transactions = [
  { id: 1, amount: 2000  },
  { id: 2, amount: -500  },
  { id: 3               },   // missing amount
  null,                        // null entry
  { id: 5, amount: 1500  },   // extra valid entry
  { amount: 800         },    // missing id
];

const validTransactions   = [];
const invalidTransactions = [];

// --- Validation Loop ---
// DEBUG TIP: Set a breakpoint here to watch 'tx', 'validTransactions',
// and 'invalidTransactions' change on each iteration in VS Code.
console.log("=".repeat(55));
console.log("       TRANSACTION VALIDATOR – PROCESSING LOG");
console.log("=".repeat(55));

for (let i = 0; i < transactions.length; i++) {
  const tx = transactions[i]; // watch: tx changes on each loop tick

  try {
    // Rule 1: Reject null entries immediately
    if (tx === null || tx === undefined) {
      throw new NullTransactionError(i);
    }

    // Rule 2: id must exist
    if (tx.id === undefined || tx.id === null) {
      throw new MissingFieldError(tx.id, "id");
    }

    // Rule 3: amount must exist
    if (tx.amount === undefined || tx.amount === null) {
      throw new MissingFieldError(tx.id, "amount");
    }

    // Rule 4: amount must not be negative
    if (tx.amount < 0) {
      throw new NegativeAmountError(tx.id, tx.amount);
    }

    // Passed all checks — push to valid list
    validTransactions.push(tx);
    console.log(`\n  ✅ VALID   | id: ${tx.id}, amount: ₹${tx.amount}`);

  } catch (err) {
    // Categorize by error type for the final report
    invalidTransactions.push({ index: i, reason: err.name, message: err.message });

    // Log with the error class name so each type is identifiable
    console.log(`\n  ❌ INVALID | [${err.name}] ${err.message}`);
  }
}

// --- Final Report ---
console.log("\n" + "=".repeat(55));
console.log("FINAL REPORT");
console.log("=".repeat(55));
console.log(`Total Processed   : ${transactions.length}`);
console.log(`✅ Successful      : ${validTransactions.length}`);
console.log(`❌ Failed          : ${invalidTransactions.length}`);

// Breakdown of failure types
const errorGroups = {};
invalidTransactions.forEach(({ reason }) => {
  errorGroups[reason] = (errorGroups[reason] || 0) + 1;
});
console.log("\nFailure Breakdown:");
Object.entries(errorGroups).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});

// Valid transaction sum
const totalAmount = validTransactions.reduce((sum, t) => sum + t.amount, 0);
console.log(`\n💰 Total Valid Amount: ₹${totalAmount}`);
