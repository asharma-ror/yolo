import React from "react"

const PaddingDecorator = (storyFn: any) => (
  <div style={{ padding: "1rem" }}>{storyFn()}</div>
)
export default PaddingDecorator
