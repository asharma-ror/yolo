import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import CustomButton from "."
import { action } from "@storybook/addon-actions"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import { Background } from "../../../../testing/components/Containers"

const story = storiesOf("Atoms|Button", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const actionsData = {
  onClick: action("onClick"),
}

story.add("Text Primary", () => (
  <Background>
    <CustomButton variant="text" color="primary" {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Text Primary Negative", () => (
  <Background primary>
    <CustomButton variant="text" color="primary" negative {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Text Secondary", () => (
  <Background>
    <CustomButton variant="text" color="secondary" {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Text Secondary Negative", () => (
  <Background primary>
    <CustomButton variant="text" color="secondary" negative {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Contained Primary", () => (
  <Background>
    <CustomButton variant="contained" color="primary" {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Contained Primary No Rounding", () => (
  <Background>
    <CustomButton
      variant="contained"
      color="primary"
      rounding="none"
      {...actionsData}
    >
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Contained Primary Negative", () => (
  <Background primary>
    <CustomButton variant="contained" color="primary" negative {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Contained Secondary", () => (
  <Background>
    <CustomButton variant="contained" color="secondary" {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Contained Secondary No Rounding", () => (
  <Background>
    <CustomButton
      variant="contained"
      color="secondary"
      rounding="none"
      {...actionsData}
    >
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Contained Secondary Negative", () => (
  <Background>
    <CustomButton
      variant="contained"
      color="secondary"
      negative
      {...actionsData}
    >
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Oublined Primary", () => (
  <Background>
    <CustomButton variant="outlined" color="primary" {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
story.add("Oublined Secondary", () => (
  <Background>
    <CustomButton variant="outlined" color="secondary" {...actionsData}>
      CLICK ME
    </CustomButton>
  </Background>
))
