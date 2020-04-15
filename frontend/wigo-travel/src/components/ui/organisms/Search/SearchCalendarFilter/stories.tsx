import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import { action } from "@storybook/addon-actions"
import SearchCalendarFilter from "."
import AppContextDecorator from "../../../../../testing/decorators/AppContextDecorator"
import { Background } from "../../../../../testing/components/Containers"
import { DurationRange } from "../../../../../features/search/searchTypes"

const story = storiesOf("Organisms|SearchCalendarFilter", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const actionsData = {
  onDateChange: action("onDateChange"),
  onDurationChange: action("onDurationChange"),
}

const props = {
  label: "QUANDO VORRESTE VIAGGIARE?",
  minDate: new Date(2020, 2, 1),
  maxDate: new Date(2021, 2, 1),
  date: new Date(2020, 2, 1),
  durations: [
    {
      minNights: 1,
      maxNights: 7,
    },
    {
      minNights: 8,
      maxNights: 14,
    },
  ],
  duration: {
    minNights: 1,
    maxNights: 7,
  },
  durationLabel: (x: DurationRange) => `${x} NOTTI`,
}

story.add("Default", () => (
  <Background primary>
    <SearchCalendarFilter {...props} {...actionsData} />
  </Background>
))
