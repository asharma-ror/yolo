import { cleanHtml } from "./htmlUtils"

const invalidTags = ["p"]

test("text string remains equal", () => {
  const input = "plain text string"
  expect(cleanHtml(input, invalidTags)).toBe("plain text string")
})

test("p tag gets removed", () => {
  const input = "text <p>with p</p> tag"
  expect(cleanHtml(input, invalidTags)).toBe("text with p tag")
})
