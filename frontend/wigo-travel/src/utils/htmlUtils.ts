const matchTagsRegex = (tags: string[]) =>
  new RegExp(`<(${tags.map((x) => `${x}|/${x}`).join("|")})[^>]{0,}>`, "ig")

const cleanHtml = (value: string, invalidTags: string[]) => {
  return value.replace(matchTagsRegex(invalidTags), "")
}

const processHtml = (
  value: string | undefined,
  processor: (term: string, first: boolean, last: boolean) => string
) => {
  const terms = value?.split(" ") ?? []
  return terms
    .map((x, index) => processor(x, index === 0, index === terms.length - 1))
    .join(" ")
}

export { cleanHtml, processHtml }
