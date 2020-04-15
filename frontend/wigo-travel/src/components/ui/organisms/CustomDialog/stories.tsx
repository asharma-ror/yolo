import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import CustomDialog from "."
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import { loremIpsium } from "../../../../testing/consts"
import CustomButton from "../../atoms/CustomButton"

const story = storiesOf("Organisms|Dialog", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const DialogWrapper = ({ children, ...params }: any) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <CustomButton onClick={() => setOpen(true)}>OPEN</CustomButton>
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <CustomButton onClick={() => setOpen(false)}>CLOSE</CustomButton>
        }
        {...params}
      >
        {children}
      </CustomDialog>
    </>
  )
}

story.add("Default", () => (
  <DialogWrapper head="Title">{loremIpsium}</DialogWrapper>
))

story.add("Default Primary", () => (
  <DialogWrapper head="Title" backgoundColor="primary">
    {loremIpsium}
  </DialogWrapper>
))

story.add("Full Screen", () => (
  <DialogWrapper head="Title" fullScreen>
    {loremIpsium}
  </DialogWrapper>
))

story.add("Full Screen Primary", () => (
  <DialogWrapper head="Title" fullScreen backgoundColor="primary">
    {loremIpsium}
  </DialogWrapper>
))
