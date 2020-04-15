import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import Loader from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"

const story = storiesOf("Atoms|Loader", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

story.add("Default", () => <Loader />)
story.add("Full Screen", () => <Loader fullScreen />)
