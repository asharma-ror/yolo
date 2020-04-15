import React from "react"
import styled from "styled-components"
import CustomButton, {
  ButtonColor,
  ButtonVariant,
} from "../../atoms/CustomButton"

interface Action {
  color?: ButtonColor
  variant?: ButtonVariant
  label: React.ReactNode
  disabled?: boolean
  negative?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
}

interface Props {
  ok?: Action
  cancel?: Action
  actionsSpacing: string
  className?: string
}

const defaultOkProps = {
  color: "primary" as ButtonColor,
  variant: "contained" as ButtonVariant,
}

const defaultCancelProps = {
  color: "primary" as ButtonColor,
  variant: "text" as ButtonVariant,
}

const PaneAction = ({ actionProps, defaultProps }: any) => {
  return (
    <CustomButton
      className={actionProps.className}
      color={actionProps.color ?? defaultProps.color}
      variant={actionProps.variant ?? defaultProps.variant}
      onClick={actionProps.onClick}
      disabled={actionProps.disabled}
      negative={actionProps.negative}
      fullWidth
    >
      {actionProps.label}
    </CustomButton>
  )
}

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ActionContainer = styled.div`
  flex: 1;
`

const PaneActions = ({ ok, cancel, actionsSpacing, className }: Props) => {
  const margin = ok && cancel ? actionsSpacing : 0
  return (
    <ActionsContainer className={className}>
      <ActionContainer style={{ marginRight: margin }}>
        {cancel ? (
          <PaneAction actionProps={cancel} defaultProps={defaultCancelProps} />
        ) : undefined}
      </ActionContainer>
      <ActionContainer style={{ marginLeft: margin }}>
        {ok ? (
          <PaneAction actionProps={ok} defaultProps={defaultOkProps} />
        ) : undefined}
      </ActionContainer>
    </ActionsContainer>
  )
}

export default PaneActions

PaneActions.defaultProps = {
  actionsSpacing: "4px",
}
