import React from "react"
import { makeStyles } from "@material-ui/core"
import { RichTextField } from "../../../molecules/Fields"
import CustomDropdown from "../../../atoms/CustomDropdown"

interface DestinationOption {
  id: string
  label: React.ReactNode
}

interface Props {
  label: React.ReactNode
  values: DestinationOption[]
  value?: DestinationOption
  onChange?: (selectedValue: DestinationOption) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  title: {
    marginBottom: theme.spacing(2),
    marginRight: "20%",
  },
}))

const SearchDestinationFilter = ({ label, values, value, onChange }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <RichTextField
        variant="h2"
        value={label}
        className={classes.title}
        color="white"
      />
      <CustomDropdown
        bold
        negative
        fullWidth
        value={value}
        values={values}
        onValueChange={onChange}
      />
    </div>
  )
}

export default SearchDestinationFilter
