const fs = require("fs");
const path = require("path");
// Read JSON file
function readJsonFile(filename) {
  const data = fs.readFileSync(filename, "utf8");
  return JSON.parse(data);
}
// Compute constant term directly: P(0)
function computeConstant(points) {
  let constantC = 0;
  for (let i = 0; i < points.length; i++) {
    let term = points[i].y;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        term *= (0 - points[j].x) / (points[i].x - points[j].x);
      }
    }
    constantC += term;
  }
  return constantC;
}
// Solve polynomial from JSON testcase object
function solveFromTestcase(name, input) {
  const n = input.keys.n;
  const k = input.keys.k;
  let points = [];
  let count = 0;
  for (let key in input) {
    if (key !== "keys" && count < k) {
      const x = parseInt(key);
      const base = parseInt(input[key].base);
      const valueStr = input[key].value;
      const y = parseInt(valueStr, base); // convert base string to decimal
      points.push({ x, y });
      count++;
    }
  }
  const constantC = computeConstant(points);
  console.log(Math.round(constantC)); // Output only c
}
// Main execution for all testcases
(function main() {
  const testcasesPath = path.join(__dirname, "testcases.json");
  const testcases = readJsonFile(testcasesPath);
  for (let name in testcases) {
    solveFromTestcase(name, testcases[name]);
  }
})();