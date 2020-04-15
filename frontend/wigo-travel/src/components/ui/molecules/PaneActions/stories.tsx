import React from "react"
import { storiesOf } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withInfo } from "@storybook/addon-info"
import AppContextDecorator from "../../../../testing/decorators/AppContextDecorator"
import PaddingDecorator from "../../../../testing/decorators/PaddingDecorator"
import PaneActions from "."
import { Background } from "../../../../testing/components/Containers"
import { action } from "@storybook/addon-actions"

const story = storiesOf("Molecules|PaneActions", module)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(AppContextDecorator)
  .addDecorator(PaddingDecorator)

const actionsData = {
  onOk: action("onOk"),
  onCancel: action("onCancel"),
}

story.add("Primary", () => (
  <Background>
    <PaneActions
      ok={{ onClick: actionsData.onOk, label: "Ok" }}
      cancel={{ onClick: actionsData.onCancel, label: "Cancel" }}
    />
  </Background>
))
story.add("Primary Negative", () => (
  <Background primary>
    <PaneActions
      ok={{ onClick: actionsData.onOk, label: "Ok", negative: true }}
      cancel={{
        onClick: actionsData.onCancel,
        label: "Cancel",
        negative: true,
      }}
    />
  </Background>
))
