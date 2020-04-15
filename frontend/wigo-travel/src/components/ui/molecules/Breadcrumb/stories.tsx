import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import Breadcrumb from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"

const story = storiesOf("Molecules|Breadcrumb", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const props = {
  segments: [
    {
      url: "/",
      name: "Segment1",
    },
    {
      url: "/child",
      name: "Segment2",
    },
    {
      url: "/child/child2",
      name: "Segment3",
    },
  ],
}

story.add("Default", () => <Breadcrumb {...props} />)
