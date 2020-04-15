import { Button } from "@material-ui/core"
import React from "react"
import { fakeDetailsFilters } from "../../../../../api/pricing/fakeData"
import DateFilter from "../../../../../components/ui/Filters/DateFilter"
import DropDownFilter from "../../../../../components/ui/Filters/DropDownFilter"
import FiltersToolbar from "../../../../../components/ui/Filters/FiltersToolbar"

interface Props {}

const PricingDetailsFilters = ({}: Props) => {
  return (
    <FiltersToolbar title="Filters">
      <DateFilter
        label="Departure Date"
        value={new Date(2020, 4, 20)}
      ></DateFilter>
      <DropDownFilter
        values={fakeDetailsFilters.airports}
        label="Airport"
        blank={false}
      ></DropDownFilter>
      <DropDownFilter
        values={fakeDetailsFilters.hotels}
        label="Hotel"
        blank={false}
      ></DropDownFilter>
      <DropDownFilter
        values={fakeDetailsFilters.roomTypes}
        label="Room Type"
        blank={false}
      ></DropDownFilter>
      <Button color="primary" variant="outlined">
        Export CSV
      </Button>
    </FiltersToolbar>
  )
}

export default PricingDetailsFilters
