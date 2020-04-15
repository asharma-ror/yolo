import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import ErrorSnackbar from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"

const story = storiesOf("Molecules|ErrorSnackbar", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const props = {
  message: "My error message",
}

story.add("Default", () => <ErrorSnackbar {...props} condition={true} />)
story.add("Fixed", () => <ErrorSnackbar {...props} condition={true} fixed />)
