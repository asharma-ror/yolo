import { makeStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import React from "react"
import { Grid } from "@material-ui/core"
import {
  SocialLinks,
  FooterLinks,
  CompanyInfo,
} from "../../../../types/contents"
import IconsLinkList from "../../molecules/IconLinksList"
import { RichTextField, ImageField, LinkField } from "../../molecules/Fields"
import ItemsList from "../../molecules/ItemsList"
import CustomContainer from "../../atoms/CustomContainer"
import TextInfoBox from "../../molecules/TextInfoBox"

interface Props {
  social?: SocialLinks
  links?: FooterLinks
  company?: CompanyInfo
  className?: string
}

const useStyles = makeStyles({
  root: {
    padding: "0.9375rem 0",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  icon: {
    maxWidth: 50,
  },
})

export default function Footer({ social, links, company, className }: Props) {
  const classes = useStyles()
  return (
    <footer className={classNames(className, classes.root)}>
      <Grid container>
        {social ? (
          <Grid item xs={12} sm={3}>
            <IconsLinkList
              title={<RichTextField value={social.title} variant="overline" />}
              links={social.links.map((x) => ({
                icon: (
                  <ImageField
                    value={x.icon}
                    size="fixed"
                    className={classes.icon}
                  />
                ),
                url: x.url,
                target: "_blank",
              }))}
            />
          </Grid>
        ) : undefined}
        {links ? (
          <Grid item xs={12} sm={9}>
            <ItemsList
              mt={2}
              items={links.items.map((x, index) => (
                <div key={index}>
                  <CustomContainer py={2}>
                    <LinkField value={x.link}>
                      <RichTextField value={x.label} variant="subtitle1" />
                    </LinkField>
                  </CustomContainer>
                </div>
              ))}
            />
          </Grid>
        ) : undefined}
      </Grid>
      {company ? (
        <TextInfoBox
          title={
            <RichTextField value={company.name} variant="h3" color="primary" />
          }
          info={<RichTextField value={company.info} variant="body2" />}
        />
      ) : undefined}
    </footer>
  )
}
