import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import { action } from "@storybook/addon-actions"
import RangeDayPicker from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import moment from "moment"
import { indexes } from "../../../../utils/arrayUtils"

const story = storiesOf("Molecules|RangeDayPicker", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const actionsData = {
  onDateRangeChanged: action("onDateRangeChanged"),
}

const calendarStart = new Date(2020, 3, 6)
const props = {
  ranges: indexes(0, 50).map((x) => ({
    from: moment(calendarStart)
      .add(x * 7, "days")
      .toDate(),
    to: moment(calendarStart)
      .add((x + 1) * 7 - 1, "days")
      .toDate(),
  })),
}

story.add("Default", () => <RangeDayPicker {...actionsData} {...props} />)
story.add("Header Hidden", () => (
  <RangeDayPicker {...actionsData} {...props} hideHeader />
))
