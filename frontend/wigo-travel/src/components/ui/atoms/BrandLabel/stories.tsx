import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import BrandLabel from "."
import { Typography } from "@material-ui/core"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"

const story = storiesOf("Atoms|BrandLabel", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const LabelContent = () => {
  return <Typography variant="h4">WIIGO</Typography>
}

story.add("Default", () => (
  <BrandLabel>
    <LabelContent />
  </BrandLabel>
))
story.add("Light", () => (
  <div style={{ backgroundColor: "black" }}>
    <BrandLabel color="light">
      <LabelContent />
    </BrandLabel>
  </div>
))
