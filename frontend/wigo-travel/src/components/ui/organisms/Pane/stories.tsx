import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import DotStepper from "../../molecules/DotStepper"
import PaneActions from "../../molecules/PaneActions"
import Pane from "."
import { action } from "@storybook/addon-actions"
import { FullScreen } from "../../../../testing/components/Containers"

const story = storiesOf("Organisms|Pane", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)

const actionsData = {
  onOk: action("onOk"),
  onCancel: action("onCancel"),
}

const Header = ({ secondary, white, ...rest }: any) => {
  return (
    <DotStepper
      steps={[{}, {}, {}]}
      activeStep={1}
      color={secondary ? "secondary" : "primary"}
      disabledColor={white ? "white" : "disabled"}
      {...rest}
    />
  )
}

const Footer = ({ secondary, negative, ...rest }: any) => {
  return (
    <PaneActions
      ok={{
        label: "Ok",
        onClick: actionsData.onOk,
        color: secondary ? "secondary" : "primary",
        negative,
      }}
      cancel={{
        label: "Cancel",
        onClick: actionsData.onCancel,
        color: secondary ? "secondary" : "primary",
        negative,
      }}
      {...rest}
    />
  )
}

story.add("Default", () => (
  <FullScreen>
    <Pane headContent={<Header />} footerContent={<Footer />}>
      CIAO
    </Pane>
  </FullScreen>
))
story.add("Primary Background", () => (
  <FullScreen>
    <Pane
      backgroundColor="primary"
      headContent={<Header secondary white />}
      footerContent={<Footer negative />}
    >
      CIAO
    </Pane>
  </FullScreen>
))
story.add("Secondary Background", () => (
  <FullScreen>
    <Pane
      backgroundColor="secondary"
      headContent={<Header white />}
      footerContent={<Footer secondary negative />}
    >
      CIAO
    </Pane>
  </FullScreen>
))
