import { Breadcrumbs } from "@material-ui/core"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { Link } from "gatsby"
import React from "react"

interface Segment {
  url?: string
  name: string
  disabled?: boolean
}

interface Props {
  segments: Segment[]
}

const Segment = ({ value }: any) => {
  return (
    <>
      {!value.disabled ? (
        <Link to={value.url}>{value.name}</Link>
      ) : (
        <span>{value.name}</span>
      )}
    </>
  )
}

const Breadcrumb = ({ segments }: Props) => {
  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {segments.map((segment, index) => (
          <Segment value={segment} key={index} />
        ))}
      </Breadcrumbs>
    </>
  )
}

export default Breadcrumb
