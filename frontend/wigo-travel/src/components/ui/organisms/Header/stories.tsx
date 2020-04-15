import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import Header from "."

const story = storiesOf("Organisms|Header", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

story.add("Default", () => <Header color="primary" />)
