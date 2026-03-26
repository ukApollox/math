import { roundTo } from "./utils.ts";

export class Fraction {
  constructor(
    private numerator: number,
    private denominator: number,
  ) {
    if (denominator === 0) {
      throw new Error("denominator must not be zero");
    }
  }

  public add(other: Fraction) {
    const newNumerator =
      this.numerator * other.denominator + other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
  }

  public subtract(other: Fraction) {
    const newNumerator =
      this.numerator * other.denominator - other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
  }

  public multiply(other: Fraction) {
    const newNumerator = this.numerator * other.numerator;
    const newDenominator = this.denominator * other.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
  }

  public divide(other: Fraction) {
    if (other.numerator === 0) {
      throw new Error("division by zero");
    }
    const newNumerator = this.numerator * other.denominator;
    const newDenominator = this.denominator * other.numerator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
  }

  public toFloat(precision: number): number {
    return roundTo(this.numerator / this.denominator, precision);
  }

  public toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  public static parse(expression: string): Fraction {
    const parts = expression.split("/");
    if (parts.length != 2) {
      throw new Error(`illegal syntax: "[numerator]/[denominator]" required`);
    }
    const numerator = Number.parseInt(parts[0].trim());
    const denominator = Number.parseFloat(parts[1].trim());
    if (Number.isNaN(numerator) || Number.isNaN(denominator)) {
      throw new Error(`non-numeric numerator/denominator`);
    }
    if (denominator === 0) {
      throw new Error("denominator must not be zero");
    }
    return new Fraction(numerator, denominator);
  }
}
