import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import Dot from "."
import { action } from "@storybook/addon-actions"

const story = storiesOf("Atoms|Dot", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const actionsData = {
  onClick: action("onClick"),
}

story.add("Primary", () => <Dot />)
story.add("Primary Clickable", () => <Dot {...actionsData} />)

story.add("Secondary", () => <Dot color="secondary" />)
story.add("Secondary Clickable", () => (
  <Dot color="secondary" {...actionsData} />
))

story.add("Neutral", () => <Dot color="neutral" />)
story.add("Neutral Clickable", () => <Dot color="neutral" {...actionsData} />)

story.add("Disabled", () => <Dot color="disabled" />)
story.add("Disabled Clickable", () => <Dot color="disabled" {...actionsData} />)
