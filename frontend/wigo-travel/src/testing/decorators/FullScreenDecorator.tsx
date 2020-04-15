import React from "react"
import { FullScreen } from "../components/Containers"

const FullScreenDecorator = (storyFn: any) => (
  <FullScreen>{storyFn()}</FullScreen>
)
export default FullScreenDecorator
