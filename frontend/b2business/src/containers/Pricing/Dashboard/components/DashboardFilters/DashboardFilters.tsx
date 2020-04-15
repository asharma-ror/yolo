import React from "react"
import { fakeDetailsFilters } from "../../../../../api/pricing/fakeData"
import DateFilter from "../../../../../components/ui/Filters/DateFilter"
import DropDownFilter from "../../../../../components/ui/Filters/DropDownFilter"
import FiltersToolbar from "../../../../../components/ui/Filters/FiltersToolbar"

interface Props {}

const DashboardFilters = ({}: Props) => {
  return (
    <FiltersToolbar title="Filters">
      <DateFilter
        label="Departure Date From"
        value={new Date(2020, 3, 1)}
      ></DateFilter>
      <DateFilter
        label="Departure Date To"
        value={new Date(2020, 5, 1)}
      ></DateFilter>
      <DropDownFilter
        values={fakeDetailsFilters.destinations}
        label="Destination"
        blank={false}
      ></DropDownFilter>
    </FiltersToolbar>
  )
}

export default DashboardFilters
