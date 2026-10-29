"use strict";

// Q2 – Employee Bonus Calculator
// "use strict" prevents implicit global creation and unsafe type coercion.
// All salary/years values arrive as strings and must be explicitly converted.

const employees = [
  { name: "Amit",  salary: "45000", years: "5" },
  { name: "Sara",  salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" },
  { name: "Riya",  salary: null,    years: "3" },  // edge case: null salary
  { name: "Dev"                                  },  // edge case: missing properties entirely
];

console.log("=".repeat(55));
console.log("        EMPLOYEE BONUS CALCULATOR – REPORT");
console.log("=".repeat(55));

// Process each employee inside try...catch so one bad record doesn't stop all
employees.forEach((emp, index) => {
  try {
    // Guard: if name is missing, throw early
    if (!emp.name) throw new Error(`Record at index ${index} is missing 'name'.`);

    // Guard: if salary or years properties are absent entirely
    if (!("salary" in emp) || !("years" in emp)) {
      throw new Error(`Employee "${emp.name}" is missing 'salary' or 'years' property.`);
    }

    // Explicit conversion from string → number
    // Number(null) → 0, Number(undefined) → NaN
    const salary = Number(emp.salary);
    const years  = Number(emp.years);

    // Validate conversions — NaN or non-positive salary is invalid
    if (isNaN(salary) || salary <= 0) {
      throw new TypeError(`Employee "${emp.name}" has an invalid salary: ${JSON.stringify(emp.salary)}`);
    }
    if (isNaN(years) || years < 0) {
      throw new TypeError(`Employee "${emp.name}" has invalid years: ${JSON.stringify(emp.years)}`);
    }

    // Bonus rule: >3 years → 10%, otherwise 5%
    // This ternary is explicit; strict mode makes sure 'bonus' is declared
    const bonusRate = years > 3 ? 0.10 : 0.05;
    const bonus     = salary * bonusRate;
    const total     = salary + bonus;

    // Template string for formatted output
    console.log(`
  👤 Name     : ${emp.name}
     Salary   : ₹${salary.toLocaleString()}
     Years    : ${years}
     Bonus    : ₹${bonus.toLocaleString()} (${bonusRate * 100}%)
     Total CTC: ₹${total.toLocaleString()}`);

  } catch (err) {
    // Categorize error type for clarity
    const errorType = err instanceof TypeError ? "TypeError" : "Error";
    console.log(`\n  ⚠️  [${errorType}] ${err.message}`);
  }
});

console.log("\n" + "=".repeat(55));
console.log("Processing complete.");
