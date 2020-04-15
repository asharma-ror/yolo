import React from "react"
import NumberFormat from "react-number-format"
import { DataValue } from "./../../../api/pricing/types"

interface Props {
  data: DataValue
}

const NumericData = ({ data }: Props) => {
  return (
    <>
      <NumberFormat
        displayType="text"
        value={data.value}
        thousandSeparator="."
        decimalSeparator=","
      />{" "}
      {data.unit}
    </>
  )
}

export default NumericData
