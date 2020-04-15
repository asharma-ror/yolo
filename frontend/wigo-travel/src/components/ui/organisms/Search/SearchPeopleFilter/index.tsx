import React from "react"
import CustomDropdown from "../../../atoms/CustomDropdown"
import { RichTextField } from "../../../molecules/Fields"
import { makeStyles } from "@material-ui/core"
import { range } from "../../../../../utils/arrayUtils"

interface PeopleOption {
  id: string
  value: number
  label: React.ReactNode
}

interface Props {
  label: any
  peopleSingularLabel: string
  peoplePluralLabel: string
  selectedPassengers: number
  maxPassengers: number
  onChange?: (selectedPassengers: number) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  title: {
    marginBottom: theme.spacing(4),
    marginRight: "20%",
  },
  select: {
    marginBottom: theme.spacing(3),
  },
}))

const createPeopleOptions = (
  maxPassengers: number,
  sinularLabel: string,
  pluralLabel: string
) => {
  return range(1, maxPassengers).map(
    (x) =>
      ({
        id: x.toString(),
        value: x,
        label: `${x} ${x === 1 ? sinularLabel : pluralLabel}`.toUpperCase(),
      } as PeopleOption)
  )
}

const SearchPeopleFilter = ({
  label,
  maxPassengers,
  selectedPassengers,
  peopleSingularLabel,
  peoplePluralLabel,
  onChange,
}: Props) => {
  const classes = useStyles()
  const values = createPeopleOptions(
    maxPassengers,
    peopleSingularLabel,
    peoplePluralLabel
  )
  const value = values.find((x) => x.value === selectedPassengers)
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
        onValueChange={(x) => onChange?.((x as PeopleOption)?.value)}
        className={classes.select}
      />
    </div>
  )
}

export default SearchPeopleFilter
