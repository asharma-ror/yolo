import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import CustomTextInput from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"

const story = storiesOf("Atoms|TextInput", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const props = {
  label: "Input",
}

const Background = ({ children }: any) => (
  <div style={{ backgroundColor: "#ff3333", padding: "1rem" }}>{children}</div>
)

story.add("Standard", () => <CustomTextInput {...props} variant="standard" />)
story.add("Outlined", () => <CustomTextInput {...props} variant="outlined" />)
story.add("Outlined Primary", () => (
  <CustomTextInput {...props} variant="outlined" color="primary" />
))
story.add("Outlined Primary No Rounding", () => (
  <CustomTextInput
    {...props}
    variant="outlined"
    color="primary"
    rounding="none"
  />
))
story.add("Outlined Secondary", () => (
  <CustomTextInput {...props} variant="outlined" color="secondary" />
))
story.add("Outlined Secondary No Rounding", () => (
  <CustomTextInput
    {...props}
    variant="outlined"
    color="secondary"
    rounding="none"
  />
))
story.add("Outlined Primary Negative", () => (
  <Background>
    <CustomTextInput {...props} variant="outlined" color="primary" negative />
  </Background>
))
story.add("Filled", () => <CustomTextInput {...props} variant="filled" />)
