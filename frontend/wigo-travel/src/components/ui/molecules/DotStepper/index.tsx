import React from "react"
import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepLabel,
  StepIconProps,
  useTheme,
  StepConnector,
  StepConnectorProps,
  Theme,
} from "@material-ui/core"
import Dot from "../../atoms/Dot"
import { getDarkenColor, getColor } from "../../../../utils/themeUtils"
import { makeStyles } from "@material-ui/styles"
import {
  leftSpacing,
  subtractSizes,
  rightSpacing,
  divideSize,
} from "../../../../utils/styleUtils"
import { indexes } from "../../../../utils/arrayUtils"

type Color = "primary" | "secondary"
type DisabledColor = "white" | "disabled"

const darkenFactor = {
  primary: 0.1,
  secondary: 0.05,
}

interface Step {
  label?: React.ReactNode
}

interface Props {
  color?: Color
  disabledColor?: DisabledColor
  labels?: React.ReactNode[]
  totSteps: number
  activeStep: number
  innerDotSize: string
  outerDotSize: string
  padding?: string
}

const getDarkenFactor = (color: Color) => {
  switch (color) {
    case "primary":
      return darkenFactor.primary
    case "secondary":
      return darkenFactor.secondary
    default:
      return 0
  }
}

const getDisabledColorValue = (theme: Theme, connectorColor: DisabledColor) => {
  switch (connectorColor) {
    case "white":
      return theme.palette.common.white
    case "disabled":
      return theme.palette.action.disabled
  }
}

interface DotsConnectorProps extends StepConnectorProps {
  color?: string
  connectorColor?: string
}

const useDotsConnectorStyles = makeStyles(() => ({
  active: {
    "& $line": {
      borderColor: (props: any) => props.color,
    },
  },
  completed: {
    "& $line": {
      borderColor: (props: any) => props.color,
    },
  },
  line: {
    borderColor: (props: any) => props.connectorColor,
    borderTopWidth: 3,
    borderRadius: 0,
  },
}))

const DotsConnector = ({
  color,
  connectorColor,
  ...other
}: DotsConnectorProps) => {
  const classes = useDotsConnectorStyles({
    color,
    connectorColor,
  })
  return <StepConnector classes={classes} {...other} />
}

const StepperDot = ({
  innerColor,
  outerColor,
  dotSize,
  outerDotSize,
  margin,
}: any) => {
  return (
    <Dot colorValue={outerColor} size={outerDotSize} style={{ margin: margin }}>
      <Dot colorValue={innerColor} size={dotSize} />
    </Dot>
  )
}

interface CustomStepIconProps extends StepIconProps {
  color: Color
  disabledColor: DisabledColor
  innerDotSize: string
  outerDotSize: string
  first: boolean
  last: boolean
}

const calculateOffset = (innerDotSize: string, outerDotSize: string) =>
  divideSize(subtractSizes(outerDotSize, innerDotSize), 2)

const getStepIconMargin = (
  innerDotSize: string,
  outerDotSize: string,
  first: boolean,
  last: boolean,
  active: boolean
) => {
  if (first && !active) {
    return leftSpacing(calculateOffset(innerDotSize, outerDotSize))
  }
  if (last && !active) {
    return rightSpacing(calculateOffset(innerDotSize, outerDotSize))
  }
}

const StepIcon = ({
  active,
  completed,
  color,
  disabledColor,
  innerDotSize,
  outerDotSize,
  first,
  last,
}: CustomStepIconProps) => {
  const theme = useTheme()
  const margin = getStepIconMargin(
    innerDotSize,
    outerDotSize,
    first,
    last,
    active ?? false
  )
  const innerColor =
    active || completed
      ? getColor(theme, color as any)
      : getDisabledColorValue(theme, disabledColor)
  const outerColor = active
    ? getDarkenColor(theme, color as any, getDarkenFactor(color as any))
    : undefined
  const outerSize = active ? outerDotSize : innerDotSize
  return (
    <div>
      <StepperDot
        innerColor={innerColor}
        outerColor={outerColor}
        dotSize={innerDotSize}
        outerDotSize={outerSize}
        margin={margin}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    padding: (props: any) => props.padding,
  },
  stepLabelContainerNoLabel: {
    padding: 0,
  },
  stepHorizontalNoLabel: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}))

const DotStepper = ({
  color,
  disabledColor,
  innerDotSize,
  outerDotSize,
  totSteps,
  labels,
  activeStep,
  padding,
}: Props) => {
  const classes = useStyles({ padding })
  const theme = useTheme()
  const steps = indexes(0, totSteps).map(
    (x) =>
      ({
        label: labels?.[x],
      } as Step)
  )
  return (
    <MuiStepper
      classes={{ root: classes.root }}
      activeStep={activeStep}
      connector={
        <DotsConnector
          color={color ? getColor(theme, color) : undefined}
          connectorColor={
            disabledColor
              ? getDisabledColorValue(theme, disabledColor)
              : undefined
          }
        />
      }
    >
      {steps.map((x, index) => (
        <MuiStep
          classes={{
            horizontal: !x.label ? classes.stepHorizontalNoLabel : undefined,
          }}
          key={index}
        >
          <StepLabel
            classes={{
              iconContainer: !x.label
                ? classes.stepLabelContainerNoLabel
                : undefined,
            }}
            StepIconComponent={StepIcon}
            StepIconProps={
              {
                color,
                disabledColor,
                innerDotSize,
                outerDotSize,
                first: index === 0,
                last: index === steps.length - 1,
              } as CustomStepIconProps
            }
          >
            {x.label}
          </StepLabel>
        </MuiStep>
      ))}
    </MuiStepper>
  )
}

DotStepper.defaultProps = {
  color: "primary" as Color,
  disabledColor: "disabled" as DisabledColor,
  innerDotSize: "0.75rem",
  outerDotSize: "1.5rem",
}

export default DotStepper
