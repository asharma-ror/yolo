import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import CustomDropdown from "."
import { action } from "@storybook/addon-actions"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"

const story = storiesOf("Atoms|Dropdown", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const actionsData = {
  onChange: action("onChange"),
  onValueChange: action("onValueChange"),
}

const props = {
  value: {
    id: "val1",
    label: "Value1",
  },
  values: [
    {
      id: "val1",
      label: "Value1",
    },
    {
      id: "val2",
      label: "Value2",
    },
    {
      id: "val3",
      label: "Value3",
    },
  ],
}

const Background = ({ color, children }: any) => (
  <div style={{ backgroundColor: color, padding: "1rem" }}>{children}</div>
)

story.add("Standard Primary", () => (
  <Background>
    <CustomDropdown
      variant="standard"
      color="primary"
      {...actionsData}
      {...props}
    />
  </Background>
))

story.add("Standard Secondary", () => (
  <Background>
    <CustomDropdown
      variant="standard"
      color="secondary"
      {...actionsData}
      {...props}
    />
  </Background>
))

story.add("Outlined Primary", () => (
  <Background>
    <CustomDropdown
      variant="outlined"
      color="primary"
      {...actionsData}
      {...props}
    />
  </Background>
))

story.add("Outlined Primary Negative", () => (
  <Background color="#ff3333">
    <CustomDropdown
      variant="outlined"
      color="primary"
      negative
      {...actionsData}
      {...props}
    />
  </Background>
))

story.add("Outlined Primary Bold Negative", () => (
  <Background color="#ff3333">
    <CustomDropdown
      variant="outlined"
      color="primary"
      negative
      bold
      {...actionsData}
      {...props}
    />
  </Background>
))

story.add("Outlined Secondary", () => (
  <Background>
    <CustomDropdown
      variant="outlined"
      color="secondary"
      {...actionsData}
      {...props}
    />
  </Background>
))

story.add("Outlined Secondary Negative", () => (
  <Background color="#ff3333">
    <CustomDropdown
      variant="outlined"
      color="secondary"
      negative
      {...actionsData}
      {...props}
    />
  </Background>
))
