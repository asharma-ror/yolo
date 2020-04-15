import React from "react"
import { ProductAllotmentWithEstimations } from "../../../../../api/products/types"
import TableToolbar from "../../../../../components/ui/Table/TableToolbar/TableToolbar"

interface Props {
  data: ProductAllotmentWithEstimations[]
  columnData: any[]
}

const AllotmentsFilterToolbar = ({ data, columnData }: Props) => {
  const [orderBy] = React.useState("")

  return (
    <TableToolbar
      orderBy={orderBy}
      rowCount={data.length}
      columnData={columnData}
      numSelected={0}
    />
  )
}

export default AllotmentsFilterToolbar
