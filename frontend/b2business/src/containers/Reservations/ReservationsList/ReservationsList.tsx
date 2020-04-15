import React from "react"
import { fakePackageTravelAssignations } from "../../../api/reservations/reservations"
import PapperBlock from "../../../components/ui/PapperBlock/PapperBlock"
import ReservationsListFilters from "./components/ReservationsListFilters/ReservationsListFilters"
import ReservationsListTable from "./components/ReservationsListTable/ReservationsListTable"

interface Props {}

const ReservationsListContainer = ({}: Props) => {
  const data = fakePackageTravelAssignations
  return (
    <>
      <PapperBlock
        noMargin
        title="Allocations"
        desc=""
        icon="ios-calendar-outline"
        whiteBg
      >
        <ReservationsListFilters></ReservationsListFilters>
        <ReservationsListTable data={data}></ReservationsListTable>
      </PapperBlock>
    </>
  )
}

export default ReservationsListContainer
