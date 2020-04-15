import React from "react"
import FavoriteIcon from "@material-ui/icons/Favorite"
import CustomIconButton from "../CustomIconButton"

interface Props {
  onClick: () => void
}

const FavoriteButton = ({ onClick }: Props) => {
  return <CustomIconButton onClick={onClick} icon={<FavoriteIcon />} />
}

export default FavoriteButton
