import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import { action } from "@storybook/addon-actions"
import SearchDestinationFilter from "."
import AppContextDecorator from "../../../../../testing/decorators/AppContextDecorator"
import { Background } from "../../../../../testing/components/Containers"

const story = storiesOf("Organisms|SearchDestinationFilter", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const actionsData = {
  onChange: action("onChange"),
}

const props = {
  label: "DOVE VORRESTI ANDARE?",
  values: [
    {
      id: "1",
      label: "OVUNQUE",
    },
    {
      id: "2",
      label: "DI QUA",
    },
    {
      id: "3",
      label: "DI LA",
    },
  ],
  value: {
    id: "1",
    label: "OVUNQUE",
  },
}

story.add("Default", () => (
  <Background primary>
    <SearchDestinationFilter {...props} {...actionsData} />
  </Background>
))
