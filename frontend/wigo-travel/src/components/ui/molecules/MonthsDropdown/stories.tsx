import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import MonthsDropdown from "."
import { Background } from "../../../../testing/components/Containers"
import { action } from "@storybook/addon-actions"

const story = storiesOf("Molecules|MonthsDropdown", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const actionsData = {
  onChange: action("onChange"),
}

story.add("Primary", () => (
  <Background>
    <MonthsDropdown
      value={new Date(2020, 3, 1)}
      minDate={new Date(2020, 3, 1)}
      maxDate={new Date(2021, 5, 1)}
      {...actionsData}
    />
  </Background>
))
