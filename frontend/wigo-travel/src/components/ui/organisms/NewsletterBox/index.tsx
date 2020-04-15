import React from "react"
import { NewsletterBoxData } from "../../../../types/contents"
import { makeStyles } from "@material-ui/core"
import CustomContainer from "../../atoms/CustomContainer"
import { RichTextField } from "../../molecules/Fields"
import TextInputButton from "../../molecules/TextInputButton"

const useStyles = makeStyles((theme) => ({
  disclaimer: {
    padding: theme.spacing(2, 0),
  },
  input: {
    padding: theme.spacing(2, 0),
  },
}))

interface Props {
  data: NewsletterBoxData
}

const NewsletterBox = ({
  data: { title, cta, disclaimer, subscribedMessage },
}: Props) => {
  const classes = useStyles()
  console.log(subscribedMessage)
  return (
    <CustomContainer backgroundColor="primary" pt={4}>
      <RichTextField value={title} variant="h3" color="white" noHtmlCustomize />
      <div className={classes.input}>
        <TextInputButton
          inputPlaceholder={cta.placeholder}
          buttonContent={cta.label}
          fullWidth
          color="primary"
          negative
        />
        <RichTextField
          value={disclaimer}
          variant="body2"
          color="white"
          className={classes.disclaimer}
        />
      </div>
    </CustomContainer>
  )
}

export default NewsletterBox
