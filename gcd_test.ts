import { assertEquals } from "jsr:@std/assert";
import { GCD } from "./gcd.ts";

const gcdTestCases = [
  { a: 1, b: 1, gcd: 1 },
  { a: 1, b: 2, gcd: 1 },
  { a: 2, b: 2, gcd: 2 },
  { a: 3, b: 4, gcd: 1 },
  { a: 6, b: 9, gcd: 3 },
  { a: 81, b: 36, gcd: 9 },
  { a: 6, b: 2, gcd: 2 },
  { a: 5, b: 5, gcd: 5 },
];

Deno.test("gcdBruteForce - table-driven tests", () => {
  for (const { a, b, gcd } of gcdTestCases) {
    const actual = GCD.gcdBruteForce(a, b);
    assertEquals(actual, gcd, `gcdBruteForce(${a}, ${b}) should equal ${gcd}`);
  }
});

Deno.test("gcdEuclid - table-driven tests", () => {
  for (const { a, b, gcd } of gcdTestCases) {
    const actual = GCD.gcdEuclid(a, b);
    assertEquals(actual, gcd, `gcdEuclid(${a}, ${b}) should equal ${gcd}`);
  }
});