import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import { action } from "@storybook/addon-actions"
import TextInputButton from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"

const story = storiesOf("Molecules|TextInputButton", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const actionsData = {
  onClick: action("onClick"),
}

const props = {
  inputPlaceholder: "Inserisci il tuo indirizzo mail",
  buttonContent: "CONFERMA",
}

const Background = ({ children, color }: any) => (
  <div style={{ backgroundColor: color, padding: "1rem" }}>{children}</div>
)

story.add("Primary", () => (
  <Background>
    <TextInputButton {...props} {...actionsData} color="primary" />
  </Background>
))

story.add("Primary Negative", () => (
  <Background color="#ff3333">
    <TextInputButton {...props} {...actionsData} color="primary" negative />
  </Background>
))

story.add("Secondary", () => (
  <Background>
    <TextInputButton {...props} {...actionsData} color="secondary" />
  </Background>
))

story.add("Secondary Negative", () => (
  <Background color="#ff3333">
    <TextInputButton {...props} {...actionsData} color="secondary" negative />
  </Background>
))
