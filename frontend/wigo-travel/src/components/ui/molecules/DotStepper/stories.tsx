import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import DotStepper from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"

const story = storiesOf("Molecules|Stepper", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const labels = ["A", "B", "C"]

const Steppers = ({ steps, background, ...props }: any) => {
  return (
    <div style={{ margin: "1rem", backgroundColor: background }}>
      {steps.map((_: any, index: number) => (
        <DotStepper key={index} activeStep={index} steps={steps} {...props} />
      ))}
    </div>
  )
}

story.add("Primary Labelled", () => (
  <Steppers color="primary" totSteps={3} labels={labels} />
))
story.add("Primary Unlabelled", () => <Steppers color="primary" totSteps={3} />)

story.add("Secondary Labelled", () => (
  <Steppers color="secondary" totSteps={3} labels={labels} />
))
story.add("Secondary Unlabelled", () => (
  <Steppers color="secondary" totSteps={3} />
))

story.add("Secondary Labelled White", () => (
  <Steppers
    color="secondary"
    disabledColor="white"
    background="#ff3333"
    totSteps={3}
    labels={labels}
  />
))
story.add("Secondary Unlabelled White", () => (
  <Steppers
    color="secondary"
    disabledColor="white"
    background="#ff3333"
    totSteps={3}
  />
))
