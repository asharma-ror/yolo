import React, { Component } from "react"
import { Helmet } from "react-helmet"
import brand from "../../../api/dummy/brand"
import PapperBlock from "../../../components/ui/PapperBlock/PapperBlock"
import EmptyData from "../../../components/ui/Tables/EmptyData"
import StrippedTable from "./StrippedTable"

class BasicTable extends Component {
  render() {
    const title = brand.name + " - Table"
    const description = brand.desc
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock
          title="Table"
          whiteBg
          icon="ios-menu-outline"
          desc="UI Table when no data to be shown"
        >
          <div>
            <StrippedTable />
          </div>
        </PapperBlock>
        <PapperBlock
          title="Empty Table"
          whiteBg
          icon="ios-square-outline"
          desc="They (allegedly) aid usability in reading tabular data by offering the user a coloured means of separating and differentiating rows from one another"
        >
          <div>
            <EmptyData />
          </div>
        </PapperBlock>
      </div>
    )
  }
}

export default BasicTable
