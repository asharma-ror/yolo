import React from "react"
import CustomDialog from "../../../ui/organisms/CustomDialog"
import SearchWidget from "../SearchWidget"
import { useTheme } from "@material-ui/core"

interface Props {
  open: boolean
  onClose?: () => void
}

const SearchWidgetDialog = ({ open, onClose }: Props) => {
  const theme = useTheme()
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      fullScreen
      backgoundColor="primary"
      padding={theme.spacing(1)}
    >
      <SearchWidget onCancel={onClose} />
    </CustomDialog>
  )
}

export default SearchWidgetDialog
