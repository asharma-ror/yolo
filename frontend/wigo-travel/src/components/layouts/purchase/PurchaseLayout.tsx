// import { CssBaseline } from "@material-ui/core"
// import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
// import React from "react"
// import theme from "../../../themes/default"
// import PurchaseFooter from "./components/PurchaseFooter/PurchaseFooter"
// import PurchaseHeader from "./components/PurchaseHeader/PurchaseHeader"

// const defaultProps = {
//   headerColor: "primary",
//   headerPosition: "default",
//   hideBrandWhenSm: false,
// }

// interface Props {
//   children: any
//   headerColor?: string
//   headerPosition?: string
//   hideBrandWhenSm?: boolean
// }

// const useStyles = makeStyles({
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh",
//   },
//   content: {
//     flex: 1,
//   },
// })

// export default function PurchaseLayout({
//   children,
//   headerColor = defaultProps.headerColor,
//   headerPosition = defaultProps.headerPosition,
//   hideBrandWhenSm = defaultProps.hideBrandWhenSm,
// }: Props) {
//   const classes = useStyles()

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className={classes.container}>
//           <PurchaseHeader
//             color={headerColor || defaultProps.headerColor}
//             position={headerPosition || defaultProps.headerPosition}
//             hideBrandWhenSm={hideBrandWhenSm}
//           />
//           <main className={classes.content}>{children}</main>
//           <PurchaseFooter />
//         </div>
//       </ThemeProvider>
//     </>
//   )
// }
