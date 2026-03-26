import { assertAlmostEquals, assertEquals, assertThrows } from "@std/assert";
import { Circle, Point2D, Rectangle } from "./geometry.ts";

Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  // Given
  const circle = new Circle(new Point2D(3, 4), 5);

  // When
  const actual = circle.circumference();

  // Then
  assertAlmostEquals(actual, 31.416, 0.01);
});

Deno.test("circle area and diameter for radius 5", () => {
  // Arrange
  const circle = new Circle(new Point2D(0, 0), 5);

  // Act
  const area = circle.area();
  const diameter = circle.diameter();

  // Assert
  assertAlmostEquals(area, Math.PI * 25, 0.0001);
  assertEquals(diameter, 10);
});

Deno.test("Point2D distanceTo works for simple triangle", () => {
  // Arrange
  const origin = new Point2D(0, 0);
  const point = new Point2D(3, 4);

  // Act
  const distance = origin.distanceTo(point);

  // Assert
  assertAlmostEquals(distance, 5);
});

Deno.test("Rectangle area, diagonal and circumference", () => {
  // Arrange
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(4, 3));

  // Act
  const area = rect.area();
  const diagonal = rect.diagonal();
  const circumference = rect.circumference();

  // Assert
  assertEquals(area, 12);
  assertAlmostEquals(diagonal, 5);
  assertEquals(circumference, 14);
});