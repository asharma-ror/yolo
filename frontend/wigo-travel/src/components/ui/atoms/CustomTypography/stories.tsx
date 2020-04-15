import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import CustomTypography from "."
import { loremIpsium } from "../../../../testing/consts"

const story = storiesOf("Atoms|Typography", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

story.add("h1", () => (
  <CustomTypography variant="h1">WHERE I GO</CustomTypography>
))
story.add("h2", () => (
  <CustomTypography variant="h2">WHERE I GO</CustomTypography>
))
story.add("h3", () => (
  <CustomTypography variant="h3">WHERE I GO</CustomTypography>
))
story.add("h4", () => (
  <CustomTypography variant="h4">WHERE I GO</CustomTypography>
))
story.add("h5", () => (
  <CustomTypography variant="h5">WHERE I GO</CustomTypography>
))
story.add("h6", () => (
  <CustomTypography variant="h6">WHERE I GO</CustomTypography>
))
story.add("subtitle1", () => (
  <CustomTypography variant="subtitle1">WHERE I GO</CustomTypography>
))
story.add("subtitle2", () => (
  <CustomTypography variant="subtitle2">WHERE I GO</CustomTypography>
))
story.add("overline", () => (
  <CustomTypography variant="overline">WHERE I GO</CustomTypography>
))
story.add("body1", () => (
  <CustomTypography variant="body1">{loremIpsium}</CustomTypography>
))
story.add("body2", () => (
  <CustomTypography variant="body2">{loremIpsium}</CustomTypography>
))
