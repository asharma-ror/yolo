import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import { action } from "@storybook/addon-actions"
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"
import CustomIconButton from "."

const props = {
  icon: <AccessAlarmIcon />,
}

const actionsData = {
  onClick: action("onClick"),
}

const story = storiesOf("Atoms|IconButton", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)

story.add("Default", () => <CustomIconButton {...props} {...actionsData} />)
