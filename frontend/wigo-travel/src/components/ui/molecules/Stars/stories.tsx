import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import Stars from "."

const story = storiesOf("Molecules|Stars", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

story.add("1 Star", () => <Stars value={1} />)
story.add("2 Star", () => <Stars value={2} />)
story.add("3 Star", () => <Stars value={3} />)
story.add("4 Star", () => <Stars value={4} />)
story.add("5 Star", () => <Stars value={5} />)
