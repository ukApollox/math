import { assertAlmostEquals, assertEquals, assertThrows } from "@std/assert";
import { Fraction } from "./fraction.ts";

Deno.test("fraction of 1/1 is 1.0", () => {
  // Arrange
  const fraction = new Fraction(1, 1);

  // Act
  const float = fraction.toFloat(0.1);

  // Assert
  assertEquals(float, 1.0);
});

Deno.test("fraction of 2/3 is roughly 0.67", () => {
  // Arrange
  const fraction = new Fraction(2, 3);

  // Act
  const float = fraction.toFloat(0.01);

  // Assert
  assertAlmostEquals(float, 0.67);
});

Deno.test("1/3 + 2/6 = 2/3 is roughly 0.67", () => {
  // Arrange
  const left = new Fraction(1, 3);
  const right = new Fraction(2, 6);

  // Act
  left.add(right);

  // Assert
  assertAlmostEquals(left.toFloat(0.01), 0.67);
});

Deno.test("2/3 - 1/3 = 1/3 is roughly 0.33", () => {
  // Arrange
  const left = new Fraction (2, 3);
  const right = new Fraction (1, 3);

  // Act
  left.subtract(right)

  // Assert
  assertAlmostEquals(left.toFloat(0.01,), 0.33);
});

Deno.test("(2/3) / (2/3) = 1", () => {
  // Arrange
  const left = new Fraction(2, 3);
  const right = new Fraction(2,3);

  // Act
  left.divide(right);

  // Assert
  assertEquals(left.toFloat(1), 1);
});

Deno.test("parse valid fraction string", () => {
  // Arrange
  const expression = "3/4";

  // Act
  const fraction = Fraction.parse(expression);

  // Assert
  assertAlmostEquals(fraction.toFloat(0.01), 0.75);
});

Deno.test("parse invalid format throws error", () => {
  // Arrange
  const expression = "3-4";

  // Act & Assert
  assertThrows(() => {
    Fraction.parse(expression);
  },
  Error,
  "illegal syntax");
});

Deno.test("parse non-numeric throws error", () => {
  // Arrange
  const expression = "a/b";

  // Act & Assert
  assertThrows(() => {
    Fraction.parse(expression);
  },
  Error,
  "non-numeric");
});

Deno.test("constructor with zero denominator throws error", () => {
  assertThrows(() => {
    new Fraction(3, 0);
  },
  Error,
  "denominator must not be zero");
});

Deno.test("parse zero denominator throws error", () => {
  assertThrows(() => {
    Fraction.parse("3/0");
  },
  Error,
  "denominator must not be zero");
});

Deno.test("divide by zero fraction throws error", () => {
  const value = new Fraction(1, 2);
  const zeroFrac = new Fraction(0, 1);

  assertThrows(() => {
    value.divide(zeroFrac);
  },
  Error,
  "division by zero");
});

Deno.test("1/3 * 3/1 = 1", () => {
  // Arrange
  const left = new Fraction(1, 3);
  const right = new Fraction(3, 1);

  // Act
  left.multiply(right);

  // Assert
  assertEquals(left.toFloat(1), 1);
});

Deno.test("3/2 - 1/2 = 1", () => {
  // Arrange
  const left = new Fraction(3, 2);
  const right = new Fraction(1, 2);

  // Act
  left.subtract(right);

  // Assert
  assertEquals(left.toFloat(1), 1);
  assertEquals(left.toString(), "1/1");
});

Deno.test("cancel() simplifies 6/9 to 2/3", () => {
  // Arrange
  const fraction = new Fraction(6, 9);

  // Act
  const simplified = fraction.cancel();

  // Assert
  assertEquals(simplified.toString(), "2/3");
});

Deno.test("cancel() returns new Fraction (immutable)", () => {
  // Arrange
  const original = new Fraction(4, 6);

  // Act
  const simplified = original.cancel();

  // Assert
  assertEquals(original.toString(), "2/3");
  assertEquals(simplified.toString(), "2/3");
  assertEquals(original !== simplified, true);
});

Deno.test("cancel() simplifies 4/4 to 1/1", () => {
  // Arrange
  const fraction = new Fraction(4, 4);

  // Act
  const simplified = fraction.cancel();

  // Assert
  assertEquals(simplified.toString(), "1/1");
});

Deno.test("cancel() leaves already-simplified 1/2 unchanged", () => {
  // Arrange
  const fraction = new Fraction(1, 2);

  // Act
  const simplified = fraction.cancel();

  // Assert
  assertEquals(simplified.toString(), "1/2");
});

Deno.test("constructor auto-simplifies 6/9 to 2/3", () => {
  // Arrange & Act
  const fraction = new Fraction(6, 9);

  // Assert
  assertEquals(fraction.toString(), "2/3");
});

Deno.test("Fraction.parse() auto-simplifies 6/9", () => {
  // Arrange & Act
  const fraction = Fraction.parse("6/9");

  // Assert
  assertEquals(fraction.toString(), "2/3");
});

Deno.test("add() auto-simplifies result", () => {
  // Arrange
  const left = new Fraction(2, 6);
  const right = new Fraction(1, 3);

  // Act
  left.add(right);

  // Assert
  assertEquals(left.toString(), "2/3");
});

Deno.test("multiply() auto-simplifies result", () => {
  // Arrange
  const left = new Fraction(2, 3);
  const right = new Fraction(3, 2);

  // Act
  left.multiply(right);

  // Assert
  assertEquals(left.toString(), "1/1");
});