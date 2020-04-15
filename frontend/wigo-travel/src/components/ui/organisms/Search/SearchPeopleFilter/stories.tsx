import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import { action } from "@storybook/addon-actions"
import SearchPeopleFilter from "."
import AppContextDecorator from "../../../../../testing/decorators/AppContextDecorator"
import { Background } from "../../../../../testing/components/Containers"

const story = storiesOf("Organisms|SearchPeopleFilter", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const actionsData = {
  onChange: action("onChange"),
}

const props = {
  label: "CON QUANTE PERSONE VORRESTI VIAGGIARE?",
  peopleSingularLabel: "PERSONA",
  peoplePluralLabel: "PERSONE",
  maxPassengers: 4,
  selectedPassengers: 1,
}

story.add("Default", () => (
  <Background primary>
    <SearchPeopleFilter {...props} {...actionsData} />
  </Background>
))
