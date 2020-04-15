import {
  Button,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import { Product } from "../../../../../api/products/types"
import StrippedTable from "../../../../../components/ui/StrippedTable/StrippedTable"
import { ApplicationTheme } from "../../../../../styles/theme/types"

interface Props {
  data: Product[]
}

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  cta: {
    margin: theme.spacing(0, 1),
  },
}))

const ProductListTable = ({ data }: Props) => {
  const classes = useStyles()
  return (
    <>
      <StrippedTable>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(product => (
            <TableRow key={product.id}>
              <TableCell padding="default">{product.name}</TableCell>
              <TableCell align="right">
                <Link to="/product/allotments" className={classes.cta}>
                  <Button color="primary" variant="contained">
                    Allotments
                  </Button>
                </Link>
                <Link to="/reservations/list" className={classes.cta}>
                  <Button color="secondary" variant="contained">
                    Reservations
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StrippedTable>
    </>
  )
}

export default ProductListTable
