import React, { ReactNode } from "react"
import DefaultLayout from "../../components/layouts/default/DefaultLayout"
import AssignationsContainer from "../../containers/Reservations/Assignations/AssignationsContainer"

interface Props {
  children: ReactNode
  location: Location
}

const ReservationsAssignation = (props: Props) => {
  return (
    <DefaultLayout {...props}>
      <AssignationsContainer></AssignationsContainer>
    </DefaultLayout>
  )
}

export default ReservationsAssignation
