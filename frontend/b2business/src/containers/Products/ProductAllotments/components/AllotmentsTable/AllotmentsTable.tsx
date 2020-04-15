import MUIDataTable, {
  FilterType,
  Responsive,
  SelectableRows,
} from "mui-datatables"
import React from "react"
import { ProductAllotmentWithEstimations } from "../../../../../api/products/types"
import AllotmentTotal from "./components/AllotmentTotal/AllotmentTotal"
import TravelDetails from "./components/TravelDetails/TravelDetails"

const defaultColumns = [
  {
    name: "Product",
    options: {
      filter: true,
      customBodyRender: (value: ProductAllotmentWithEstimations) => (
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 700 }}>{value.product.name}</div>
          <div>Week {value.interval.week}</div>
        </div>
      ),
    },
  },
  {
    name: "Details",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: ProductAllotmentWithEstimations) => (
        <TravelDetails data={value}></TravelDetails>
      ),
    },
  },
  {
    name: "Allotment",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: ProductAllotmentWithEstimations) => (
        <AllotmentTotal data={value}></AllotmentTotal>
      ),
    },
  },
]

const defaultOptions = {
  filterType: "dropdown" as FilterType,
  responsive: "stacked" as Responsive,
  selectableRows: "none" as SelectableRows,
  print: true,
  rowsPerPage: 10,
  page: 0,
}

interface Props {
  data: ProductAllotmentWithEstimations[]
}

const AllotmentsTable = ({ data }: Props) => {
  const [columns] = React.useState(defaultColumns)
  const convertedData = data.map(x => [x, x, x])

  return (
    <>
      <MUIDataTable
        title=""
        data={convertedData}
        columns={columns}
        options={defaultOptions}
      />
    </>
  )
}

export default AllotmentsTable
