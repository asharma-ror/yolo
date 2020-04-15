export interface SitePage {
  id: string
  path: string
  source: string
}

export interface HeaderData {
  labels: {
    loginMenuName: string
  }
  links: any[]
}

export interface Cta {
  placeholder: string
  label: string
}

export interface SocialLink {
  icon: any
  url: string
}

export interface NewsletterBoxData {
  title?: any
  cta: Cta
  disclaimer: any
  subscribedMessage: any
}

export interface FooterLink {
  label: any
  link: any
}

export interface SocialLinks {
  title?: any
  links: SocialLink[]
}

export interface FooterLinks {
  items: FooterLink[]
}

export interface CompanyInfo {
  name?: any
  info?: any
}

export interface FooterData {
  newsletterBox?: NewsletterBoxData
  social?: SocialLinks
  links?: FooterLinks
  company?: CompanyInfo
}

export interface LayoutData {
  header: HeaderData
  footer: FooterData
}
