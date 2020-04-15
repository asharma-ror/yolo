import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import HeaderDrawer from "."
import { action } from "@storybook/addon-actions"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"

const story = storiesOf("Organisms|Header Drawer", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const actionsData = {
  onClose: action("onClose"),
}

const links = <></>
const bottom = <></>

story.add("Default", () => (
  <HeaderDrawer open={true} {...actionsData} bottomContent={bottom}>
    {links}
  </HeaderDrawer>
))
