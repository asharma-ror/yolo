import React from "react"
import { fakeDetailsFilters } from "../../../../../api/pricing/fakeData"
import DateFilter from "../../../../../components/ui/Filters/DateFilter"
import DropDownFilter from "../../../../../components/ui/Filters/DropDownFilter"
import FiltersToolbar from "../../../../../components/ui/Filters/FiltersToolbar"

interface Props {}

const ReservationsListFilters = ({}: Props) => {
  return (
    <FiltersToolbar title="Filters">
      <DateFilter
        label="Departure From"
        value={new Date(2020, 4, 1)}
      ></DateFilter>
      <DateFilter
        label="Departure To"
        value={new Date(2020, 5, 1)}
      ></DateFilter>
      <DropDownFilter
        values={fakeDetailsFilters.airports}
        label="Airport"
        blank={false}
      ></DropDownFilter>
      <DropDownFilter
        values={fakeDetailsFilters.bundles}
        label="Product"
        blank={false}
      ></DropDownFilter>
    </FiltersToolbar>
  )
}

export default ReservationsListFilters
