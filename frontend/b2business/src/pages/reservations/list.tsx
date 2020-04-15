import React, { ReactNode } from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import ReservationsListContainer from "../../containers/Reservations/ReservationsList/ReservationsList"

interface Props {
  children: ReactNode
  location: Location
}

const ReservationsList = (props: Props) => {
  return (
    <DefaultLayout {...props} title="Reservations">
      <ReservationsListContainer></ReservationsListContainer>
    </DefaultLayout>
  )
}

export default ReservationsList
