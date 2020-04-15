import { Button, makeStyles, TextField } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import React from "react"
import { ApplicationTheme } from "../../../styles/theme/types"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}))

interface Props {
  initialValue?: number
  minValue?: number
  maxValue?: number
  label?: React.ReactNode
  onChange?: (value: number) => void
}

const QuantityInput = ({
  initialValue,
  minValue,
  maxValue,
  label,
  onChange,
}: Props) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(initialValue ?? 0)

  const isValidValue = (newValue: number) => {
    return (
      (!maxValue || newValue <= maxValue) && (!minValue || newValue >= minValue)
    )
  }

  const updateValue = (newValue: number) => {
    if (!isValidValue(newValue)) {
      return
    }
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const canAddUnit = () => {
    return maxValue ? value < maxValue : true
  }
  const canRemoveUnit = () => {
    return minValue !== undefined ? value > minValue : true
  }
  const addUnit = () => {
    if (!canAddUnit()) {
      return
    }
    updateValue(value + 1)
  }
  const removeUnit = () => {
    if (!canRemoveUnit()) {
      return
    }
    updateValue(value - 1)
  }

  return (
    <div className={classes.root}>
      <Button color="primary" onClick={removeUnit} disabled={!canRemoveUnit()}>
        <RemoveIcon></RemoveIcon>
      </Button>
      <TextField
        autoFocus
        label={label}
        type="text"
        value={value}
        onChange={x => updateValue(parseInt(x.target.value))}
      />
      <Button color="primary" onClick={addUnit} disabled={!canAddUnit()}>
        <AddIcon></AddIcon>
      </Button>
    </div>
  )
}

export default QuantityInput
