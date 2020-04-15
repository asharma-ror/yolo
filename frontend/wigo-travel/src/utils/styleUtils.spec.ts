import {
  leftSpacing,
  addSizes,
  subtractSizes,
  divideSize,
  multiplySize,
  xSpacing,
  rightSpacing,
} from "./styleUtils"

test("right spacing abs", () => expect(rightSpacing(10)).toBe("0 10 0 0"))
test("right spacing px", () => expect(rightSpacing("10px")).toBe("0 10px 0 0"))
test("right spacing rem", () =>
  expect(rightSpacing("0.1rem")).toBe("0 0.1rem 0 0"))

test("left spacing abs", () => expect(leftSpacing(10)).toBe("0 0 0 10"))
test("left spacing px", () => expect(leftSpacing("10px")).toBe("0 0 0 10px"))
test("left spacing rem", () =>
  expect(leftSpacing("0.1rem")).toBe("0 0 0 0.1rem"))

test("x spacing abs", () => expect(xSpacing(10)).toBe("0 10 0 10"))
test("x spacing px", () => expect(xSpacing("10px")).toBe("0 10px 0 10px"))
test("x spacing rem", () =>
  expect(xSpacing("0.1rem")).toBe("0 0.1rem 0 0.1rem"))

test("add abs", () => expect(addSizes(5, 10)).toBe(15))
test("add px", () => expect(addSizes("5px", "10px")).toBe("15px"))
test("add rem", () => expect(addSizes("0.25rem", "0.5rem")).toBe("0.75rem"))

test("subtract abs", () => expect(subtractSizes(15, 5)).toBe(10))
test("subtract px", () => expect(subtractSizes("15px", "10px")).toBe("5px"))
test("subtract rem", () =>
  expect(subtractSizes("0.75rem", "0.5rem")).toBe("0.25rem"))

test("divide abs", () => expect(divideSize(20, 2)).toBe(10))
test("divide px", () => expect(divideSize("20px", 2)).toBe("10px"))
test("divide rem", () => expect(divideSize("0.5rem", 2)).toBe("0.25rem"))

test("multiply abs", () => expect(multiplySize(20, 2)).toBe(40))
test("multiply px", () => expect(multiplySize("20px", 2)).toBe("40px"))
test("multiply rem", () => expect(multiplySize("0.5rem", 2)).toBe("1rem"))
