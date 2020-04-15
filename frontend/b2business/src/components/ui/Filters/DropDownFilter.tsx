import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core"
import React from "react"
import { ApplicationTheme } from "../../../styles/theme/types"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

interface FilterItem {
  label: React.ReactNode
  value: any
}

interface FilterProps {
  label: React.ReactNode
  values: FilterItem[]
  blank: boolean
}

const DropDownFilter = ({ values, label, blank }: FilterProps) => {
  const classes = useStyles()
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">{label}</InputLabel>
        <Select
          inputProps={{
            name: "age",
            id: "age-simple",
          }}
          value={blank ? "" : values[0].value}
        >
          {blank ? (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          ) : (
            undefined
          )}
          {values.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default DropDownFilter
