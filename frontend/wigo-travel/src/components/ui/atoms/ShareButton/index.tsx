import React from "react"
import ReplyIcon from "@material-ui/icons/Reply"
import CustomIconButton from "../CustomIconButton"

interface Props {
  onClick: () => void
}

const ShareButton = ({ onClick }: Props) => {
  return (
    <CustomIconButton
      onClick={onClick}
      icon={<ReplyIcon style={{ transform: "scaleX(-1)" }} />}
    />
  )
}

export default ShareButton
