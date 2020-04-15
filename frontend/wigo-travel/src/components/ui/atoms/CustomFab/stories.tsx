import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import { CloseFab } from "."
import { action } from "@storybook/addon-actions"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"

const story = storiesOf("Atoms|Fab", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const actionsData = {
  onClick: action("onClick"),
}

story.add("CloseFab", () => <CloseFab {...actionsData} />)
story.add("CloseFab secondary", () => (
  <CloseFab color="secondary" {...actionsData} />
))
